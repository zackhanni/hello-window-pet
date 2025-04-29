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
  id: string;
  name: string;
  city?: string;
  age?: number;
  imageUrl: string;
  species?: string;
  description: string;
}

export const AnimalCard = async ({ animal }: { animal: Animal }) => {
  const photos = await getCatPhotos(animal.id);

  const { id, name, city, species, imageUrl, description } = animal;

  return (
    <Card className="flex flex-col items-center justify-center max-w-md">
      <CardHeader className="w-full">
        <CardTitle>
          {name} from {city} has {photos.length} photos.
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
