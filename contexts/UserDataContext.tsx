"use client";

import { Session } from "next-auth";
import { createContext, useContext, useEffect, useState } from "react";

interface UserDataContextType {
  loading: boolean;
  databaseUser: DatabaseUser | null;
  userPets: Pet | null;
}

const UserDataContext = createContext<UserDataContextType>({
  loading: true,
  databaseUser: null,
  userPets: null,
});

export const useUserData = () => useContext(UserDataContext);

export const UserDataProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) => {
  const [databaseUser, setDatabaseUser] = useState<DatabaseUser | null>(null);
  const [userPets, setUserPets] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatabaseUserData = async () => {
      try {
        if (session?.user) {
          const userRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users/${session.user.email}`,
            {
              method: "GET",
            }
          );
          if (!userRes.ok) {
            console.error("Failed to create user", await userRes.text());
            return;
          }
          let dbUser = await userRes.json();

          if (!dbUser) {
            const createRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users`,
              {
                method: "POST",
                body: JSON.stringify({
                  name: session.user.name,
                  email: session.user.email,
                }),
                headers: { "Content-Type": "application/json" },
              }
            );
            if (!createRes.ok) {
              console.error("Failed to create user", await createRes.text());
              return;
            }
            dbUser = await createRes.json();
          }

          setDatabaseUser(dbUser);
          if (process.env.NODE_ENV === "development") {
            console.log("User loaded:", dbUser);
          }
        }
      } catch (error) {
        console.error("An error occurred while fetching user data:", error);
      }

      setLoading(false);
    };

    fetchDatabaseUserData();
  }, [session]);

  useEffect(() => {
    const fetchUserAnimals = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users/user/${databaseUser?.id}/pets`,
          {
            method: "GET",
          }
        );
        const pets = await res.json();
        setUserPets(pets);
      } catch (error) {
        console.error(
          "An error occurred while fetching user user pets:",
          error
        );
      }
    };

    fetchUserAnimals();
  }, [databaseUser]);

  return (
    <UserDataContext.Provider value={{ databaseUser, userPets, loading }}>
      {children}
    </UserDataContext.Provider>
  );
};
