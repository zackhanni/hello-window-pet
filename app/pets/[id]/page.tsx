import { UploadButton } from "@/components/UploadButton";
import { getCatById, getAnimalPhotos } from "@/lib/cats";
import { Image, ImageKitProvider } from "@imagekit/next";

import React from "react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CatPage({ params }: PageProps) {
  const { id } = await params;
  const cat = await getCatById(id);

  if (!cat)
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <p className="pb-8">Sorry, but we couldn&apos;t find that cat.</p>
        <p> Heres one of ours though!</p>
        <Image
          src={"/cats/buddy.jpg"}
          alt={"Buddy the cat"}
          priority
          width={200}
          height={200}
          className="rounded-lg"
        />
      </div>
    );

  const photos = await getAnimalPhotos(id);
  const sortedPhotos = photos.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <main className="space-y-8 py-8">
      <section>
        <div className="flex items-center flex-col">
          <h1 className="font-bold text-3xl">This is {cat.name}</h1>
          {/* <p>from {cat.city}</p> */}
          <p>They have been seen {photos.length} times.</p>

          <ImageKitProvider urlEndpoint="https://ik.imagekit.io/assortfit">
            <Image
              src={cat.imageUrl ?? "pets/default-image.jpg"}
              width={300}
              height={300}
              alt={cat.name}
              priority
              className="rounded-lg"
            />
          </ImageKitProvider>
        </div>
      </section>
      <section className="bg-secondary py-8">
        <div className="flex items-center flex-col px-4">
          <p>Have you seen this cat?</p>
          <p className="pb-8">
            Upload a photo to let the owner know they are ok!
          </p>
          <UploadButton petId={cat.id} />
        </div>
      </section>
      <section>
        <div className="flex items-center flex-col space-y-4">
          <h2 className="text-2xl font-bold">Recent photos</h2>
          {/* <div>
            <p>Uploaded on 4/27/25 at 12:30pm</p>
            <Image src={cat.photoUrl} alt={cat.name} width={300} height={300} />
          </div> */}

          {photos ? (
            <ImageKitProvider urlEndpoint="https://ik.imagekit.io/assortfit">
              {sortedPhotos.map((photo) => (
                <div key={photo.fileId} className="flex flex-col items-center">
                  <p className="px-8 pb-2 text-sm">Taken {photo.createdAt}</p>
                  <Image
                    src={photo.filePath}
                    width={300}
                    height={300}
                    alt={photo.name}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </ImageKitProvider>
          ) : (
            <p>No photos yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
