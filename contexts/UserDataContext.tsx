"use client";

import { Session } from "next-auth";
import { createContext, useContext, useEffect, useState } from "react";

interface UserDataContextType {
  loading: boolean;
  databaseUser: DatabaseUser | null;
  userPets: Pet[] | null;
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
  session: Session | null;
}) => {
  const [databaseUser, setDatabaseUser] = useState<DatabaseUser | null>(null);
  const [userPets, setUserPets] = useState<Pet[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatabaseUserData = async () => {
      let dbUser = null;

      try {
        // If there is a session..
        if (session?.user) {
          // check if user exists in database
          const findUserResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users/${session.user.email}`,
            {
              method: "GET",
            }
          );

          if (findUserResponse.ok) {
            // User exists, get the user data
            dbUser = await findUserResponse.json();
          } else if (findUserResponse.status === 404) {
            // User doesn't exist, create them
            const createUserResponse = await fetch(
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

            if (createUserResponse.ok) {
              dbUser = await createUserResponse.json();
              if (process.env.NODE_ENV === "development") {
                console.log("User created:", dbUser);
              }
            } else {
              console.error("Failed to create user", await createUserResponse.text());
            }
          } else {
            console.error("Error checking user existence:", findUserResponse.status);
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
      if (!databaseUser?.id) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users/user/${databaseUser.id}/pets`,
          {
            method: "GET",
          }
        );

        if (res.ok) {
          const pets = await res.json();
          setUserPets(pets);
        } else {
          console.error("Failed to fetch user pets:", res.status);
          setUserPets([]);
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching user pets:",
          error
        );
        setUserPets([]);
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
