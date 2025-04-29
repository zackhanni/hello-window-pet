import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCatPhotos } from "@/lib/cats";
import { Image, ImageKitProvider } from "@imagekit/next";
import Link from "next/link";
import React from "react";

interface Animal {
  name: string;
  id: string;
  userId: string;
  description: string | null;
  species: string | null;
  age: number | null;
  imageUrl: string | null; // Make this optional
  createdAt: Date;
}

export const AnimalCard = async ({ animal }: { animal: Animal }) => {
  const photos = await getCatPhotos(animal.id);

  const { id, name, species, imageUrl, description } = animal;

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
            src={imageUrl}
            width={300}
            height={300}
            alt={name}
            className="max-h-[300px] object-cover"
          />
        </ImageKitProvider>
      </CardContent>
      <CardFooter className="w-full">
        <Link href={`/cats/${id}`} className="w-full">
          <Button className="w-full">Visit this {species}!</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
