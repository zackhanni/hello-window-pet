import { AnimalCard } from "@/components/AnimalCard";
import { getAllCats } from "@/lib/cats";
import React from "react";

const page = async () => {
  const allCats = await getAllCats();

  console.log(allCats);

  return (
    <main className="py-8">
      <h1 className="text-center text-3xl font-bold pb-4">
        Check out some recent cats!
      </h1>
      <section className="flex items-center justify-center flex-col md:flex-row gap-8">
        {allCats.map((cat) => (
          <AnimalCard animal={cat} key={cat.id} />
        ))}
      </section>
    </main>
  );
};

export default page;
