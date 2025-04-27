import { Button } from "@/components/ui/button";
import { getCatById } from "@/lib/cats";
import Image from "next/image";
import React from "react";

type PageProps = {
  params: { id: string };
};

export default async function CatPage({ params }: PageProps) {
  const cat = getCatById(params.id);

  if (!cat) return <div>Cat not found</div>;

  return (
    <div className="space-y-8 py-8">
      <section>
        <div className="flex items-center flex-col">
          <h1 className="font-bold text-3xl">This is {cat.name}</h1>
          <p>from {cat.city}</p>

          <Image src={cat.photoUrl} alt={cat.name} width={300} height={300} />
        </div>
      </section>
      <section className="bg-blue-100 py-8">
        <div className="flex items-center flex-col space-y-4">
          <p>Have you seen this cat?</p>
          <Button>Yes, I see them now!</Button>
          <Button>Upload a photo</Button>
        </div>
      </section>
      <section>
        <div className="flex items-center flex-col space-y-4">
          <p>Recent photos</p>
          <div>
            <p>Taken by Zack on 4/27/25</p>
            <Image src={cat.photoUrl} alt={cat.name} width={300} height={300} />
          </div>
        </div>
      </section>
    </div>
  );
}
