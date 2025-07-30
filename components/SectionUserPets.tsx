"use client";

import React from "react";
import CreatePet from "./CreatePet";
import { PetCard } from "./PetCard";
import { useUserData } from "@/contexts/UserDataContext";

export const SectionUserPets = ({ user }: { user: string }) => {
  const { databaseUser } = useUserData();
  return (
    <section className="flex flex-col justify-center space-y-4">
      <div className="flex justify-center">
        <CreatePet />
      </div>
      <p className="text-center">{user}&apos;s Pets</p>
      <div className="flex items-center justify-center flex-col md:flex-row gap-8">
        {databaseUser?.pets &&
          databaseUser?.pets.map((pet: Pet, index: number) => (
            <div key={pet.id} className="flex flex-col space-y-4">
              <PetCard pet={pet} index={index} />
            </div>
          ))}
      </div>
    </section>
  );
};
