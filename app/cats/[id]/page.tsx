import { Button } from "@/components/ui/button";
import { getCatById } from "@/lib/cats";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

type PageProps = {
  params: { id: string };
};

export default async function CatPage({ params }: PageProps) {
  const cat = await getCatById(params.id);

  if (!cat)
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <p className="pb-8">Sorry, but we couldn&apos;t find that cat.</p>
        <p> Heres one of ours though!</p>
        <Image
          src={"/cats/buddy.jpg"}
          alt={"Buddy the cat"}
          width={200}
          height={200}
        />
      </div>
    );

  return (
    <div className="space-y-8 py-8">
      <section>
        <div className="flex items-center flex-col">
          <h1 className="font-bold text-3xl">This is {cat.name}</h1>
          <p>from {cat.city}</p>
          <p>He has been seen {cat.seenCount} times.</p>

          <Image src={cat.photoUrl} alt={cat.name} width={300} height={300} />
        </div>
      </section>
      <section className="bg-blue-100 py-8">
        <div className="flex items-center flex-col">
          <p>Have you seen this cat?</p>
          <p className="pb-8">
            Upload a photo to let the owner know they are ok!
          </p>
          <Button>
            Upload Image
            <UploadIcon />
          </Button>
        </div>
      </section>
      <section>
        <div className="flex items-center flex-col space-y-4">
          <p>Recent photos</p>
          <div>
            <p>Uploaded on 4/27/25 at 12:30pm</p>
            <Image src={cat.photoUrl} alt={cat.name} width={300} height={300} />
          </div>
        </div>
      </section>
    </div>
  );
}
