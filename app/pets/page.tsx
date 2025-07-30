import { PetCard } from "@/components/PetCard";
import { getAllPets } from "@/lib/userAndPetHelpers";
import React from "react";

// Force dynamic rendering to prevent build-time data fetching
export const dynamic = "force-dynamic";

const page = async () => {
  const pets = await getAllPets();

  return (
    <main className="py-8">
      <h1 className="text-center text-3xl font-bold pb-4">All Pets</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 place-items-center">
        {pets && pets.length > 0 ? (
          pets.map((pet: Pet, index: number) => (
            <PetCard pet={pet} key={pet.id} index={index} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No pets found
          </div>
        )}
      </section>
    </main>
  );
};

export default page;
