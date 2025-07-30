"use client";

import { addUser, getUser } from "@/lib/userAndPetHelpers";
import { Session } from "next-auth";
import { createContext, useContext, useEffect, useState } from "react";

interface UserDataContextType {
  loading: boolean;
  databaseUser: DatabaseUser | null;
}

const UserDataContext = createContext<UserDataContextType>({
  loading: true,
  databaseUser: null,
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatabaseUserData = async () => {
      if (!session?.user?.email || !session.user.name) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        let user = await getUser(session.user.email);
        if (!user) {
          user = await addUser({
            name: session.user.name,
            email: session.user.email,
          });
        }
        setDatabaseUser(user);
      } catch (error) {
        console.error("Error fetching/creating user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatabaseUserData();
  }, [session]);

  return (
    <UserDataContext.Provider value={{ databaseUser, loading }}>
      {children}
    </UserDataContext.Provider>
  );
};
