import { PetCard } from "@/components/PetCard";
import React from "react";

const page = async () => {
  let pets = [];

  try {
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || '';
    const response = await fetch(
      `${apiEndpoint}/api/pets`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch pets:", response.status);
      throw new Error(`Failed to fetch pets: ${response.status}`);
    }

    pets = await response.json();
  } catch (error) {
    console.error("Error fetching pets:", error);
    // Return empty array instead of crashing
    pets = [];
  }

  return (
    <main className="py-8">
      <h1 className="text-center text-3xl font-bold pb-4">
        All Pets
      </h1>
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
