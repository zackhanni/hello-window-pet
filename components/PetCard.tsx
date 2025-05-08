import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Image, ImageKitProvider } from "@imagekit/next";
import Link from "next/link";
import React from "react";

export const PetCard = ({ pet }: { pet: Pet }) => {
  const { id, name, species, imageUrl, description } = pet;

  return (
    <Card className="flex flex-col items-center justify-center max-w-md">
      <CardHeader className="w-full">
        <CardTitle>{name}</CardTitle>
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
      <CardFooter className="w-full ">
        <Link href={`/pets/${id}`} className="w-full">
          <Button variant={"secondary"}>Visit this {species}!</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
