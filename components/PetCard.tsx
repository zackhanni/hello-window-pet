import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAnimalPhotos } from "@/lib/cats";
import { Image, ImageKitProvider } from "@imagekit/next";
import Link from "next/link";
import React from "react";

// interface Animal {
//   name: string;
//   id: string;
//   userId: string;
//   description: string | null;
//   species: string | null;
//   age: number | null;
//   imageUrl: string | null; // Make this optional
//   createdAt: Date;
// }

export const PetCard = async ({ pet }: { pet: Pet }) => {
  const photos = await getAnimalPhotos(pet.id);

  const { id, name, species, imageUrl, description } = pet;

  return (
    <Card className="flex flex-col items-center justify-center max-w-md">
      <CardHeader className="w-full">
        <CardTitle>
          {name} has {photos.length} photos.
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ImageKitProvider urlEndpoint="https://ik.imagekit.io/assortfit">
          <Image
            src={imageUrl ?? "pets/default-image.jpg"}
            width={300}
            height={300}
            alt={name}
            className="max-h-[300px] object-cover"
          />
        </ImageKitProvider>
      </CardContent>
      <CardFooter className="w-full">
        <Link href={`/pets/${id}`} className="w-full">
          <Button className="w-full">Visit this {species}!</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
