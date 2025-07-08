import { PetCard } from "@/components/PetCard";
import React from "react";

const page = async () => {
  const pets = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/pets`
  ).then((res) => res.json());

  // console.log(pets);

  return (
    <main className="py-8">
      <h1 className="text-center text-3xl font-bold pb-4">
        All Pets
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 place-items-center">
        {pets &&
          pets.map((pet: Pet, index: number) => (
            <PetCard pet={pet} key={pet.id} index={index} />
          ))}
      </section>
    </main>
  );
};

export default page;
