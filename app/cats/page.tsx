import { AnimalCard } from "@/components/AnimalCard";
import { Pet } from "@prisma/client";
import React from "react";

const page = async () => {
  const pets = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/pets`
  ).then((res) => res.json());

  console.log(pets);

  return (
    <main className="py-8">
      <h1 className="text-center text-3xl font-bold pb-4">
        Check out some recent cats!
      </h1>
      <section className="flex items-center justify-center flex-col md:flex-row gap-8">
        {pets.map((pet: Pet) => (
          <AnimalCard animal={pet} key={pet.id} />
        ))}
      </section>
    </main>
  );
};

export default page;
