import { UploadButton } from "@/components/UploadButton";
import { getPetById, getPetPhotos } from "@/lib/userAndPetHelpers";
import { Image, ImageKitProvider } from "@imagekit/next";
import { PetSharedImage } from "@/components/PetSharedImage";

import React from "react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PetPage({ params }: PageProps) {
  const { id } = await params;
  let pet = null;
  try {
    pet = await getPetById(id);
  } catch (error) {
    console.error("Error fetching pet:", error);
    pet = null;
  }

  if (!pet || !pet.imageUrl)
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <p className="pb-8">Sorry, but we couldn&apos;t find that cat.</p>
        <p> Heres one of ours though!</p>
        <ImageKitProvider urlEndpoint={process.env.NEXT_PUBLIC_API_ENDPOINT}>
          <Image
            src={"/cats/buddy.jpg"}
            alt={"Buddy the cat"}
            priority
            width={300}
            height={300}
            className="rounded-lg"
          />
        </ImageKitProvider>
      </div>
    );

  const photos = await getPetPhotos(id);
  const sortedPhotos = photos.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="flex flex-col items-center justify-items-center gap-16 py-20 px-2">
      <main className="space-y-8">
        <section>
          <div className="flex items-center flex-col">
            <h1 className="font-bold text-3xl">This is {pet.name}</h1>
            {/* <p>from {cat.city}</p> */}
            <p>They have been seen {photos.length} times.</p>

            <ImageKitProvider urlEndpoint="https://ik.imagekit.io/assortfit">
              <Image
                src={pet.imageUrl ?? "pets/default-image.jpg"}
                width={300}
                height={300}
                alt={pet.name}
                priority
                className="rounded-lg"
              />
            </ImageKitProvider>
          </div>
        </section>
        <section className="border border-primary py-8">
          <div className="flex items-center flex-col px-4">
            <p>Have you seen this cat?</p>
            <p className="pb-8">
              Upload a photo to let the owner know they are ok!
            </p>
            <UploadButton petId={pet.id} />
          </div>
        </section>
        <section>
          <div className="flex items-center flex-col space-y-4">
            <h2 className="text-2xl font-bold">Recent photos</h2>
            {photos ? (
              <ImageKitProvider urlEndpoint="https://ik.imagekit.io/assortfit">
                {sortedPhotos.map((photo) => (
                  <PetSharedImage photo={photo} pet={pet} key={photo.fileId} />
                ))}
              </ImageKitProvider>
            ) : (
              <p>No photos yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
