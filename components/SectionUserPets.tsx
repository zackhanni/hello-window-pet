"use client";

import React from "react";
import CreatePet from "./CreatePet";
import { PetCard } from "./PetCard";
import { GeneratePDF } from "./GeneratePDF";
import { DeleteButton } from "./DeleteButton";
import { useUserData } from "@/contexts/UserDataContext";

export const SectionUserPets = () => {
  const { userPets } = useUserData();
  return (
    <section className="flex flex-col justify-center space-y-4">
      <div className="flex justify-center">
        <CreatePet />
      </div>
      <p className="text-3xl font-bold text-center">My Pets</p>
      <div className="flex items-center justify-center flex-col md:flex-row gap-8">
        {userPets &&
          userPets.map((pet: Pet) => (
            <div key={pet.id} className="flex flex-col space-y-4">
              <PetCard pet={pet} />
              <GeneratePDF pet={pet} />
              <CreatePet pet={pet} />
              <DeleteButton id={pet.id} type="pets" />
            </div>
          ))}
      </div>
    </section>
  );
};
