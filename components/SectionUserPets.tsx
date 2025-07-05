"use client";

import React from "react";
import CreatePet from "./CreatePet";
import { PetCard } from "./PetCard";
import { GeneratePDF } from "./GeneratePDF";
import { DeleteButton } from "./DeleteButton";
import { useUserData } from "@/contexts/UserDataContext";

export const SectionUserPets = ({ user }: { user: string }) => {
  const { userPets } = useUserData();
  return (
    <section className="flex flex-col justify-center space-y-4">
      <div className="flex justify-center max-w-md">
        <CreatePet />
      </div>
      <p className="text-center">{user}&apos;s Pets</p>
      <div className="flex items-center justify-center flex-col md:flex-row gap-8">
        {userPets &&
          userPets.map((pet: Pet, index: number) => (
            <div key={pet.id} className="flex flex-col space-y-4">
              <PetCard pet={pet} index={index} />
              <GeneratePDF pet={pet} />
              <CreatePet pet={pet} />
              <DeleteButton id={pet.id} type="pets" />
            </div>
          ))}
      </div>
    </section>
  );
};
