"use client" // added for userRouter to work.

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Image, ImageKitProvider } from "@imagekit/next";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useUserData } from "@/contexts/UserDataContext";
import { GeneratePDF } from "./GeneratePDF";
import CreatePet from "./CreatePet";
import { deletePetPhotoFromImagekit, getPetPhotos } from "@/lib/userAndPetHelpers";

export const PetCard = ({ pet, index }: { pet: Pet, index: number }) => {
  const { id, name, species, imageUrl, description } = pet;
  const { databaseUser } = useUserData();
  const router = useRouter();

  const handleDeletePost = async (id: string) => {

    // First, delete all photos taken of this animal
    const photos = await getPetPhotos(id);
    for (const photo of photos) {
      await deletePetPhotoFromImagekit(photo.fileId);
    }

    // Then, delete the animal from the database
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/pets/${id}`,
      {
        method: "DELETE",
      }
    );
    if (result.ok) {
      router.refresh();
    } else {
      console.error("Failed to delete:", result.statusText);
    }
  };

  return (
    <Card className="flex flex-col items-center justify-center max-w-md bg-secondary border-none rounded-lg shadow-none">
      <CardHeader className="w-full">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ImageKitProvider urlEndpoint="https://ik.imagekit.io/assortfit">
          <Image
            src={imageUrl ?? "pets/default-image.jpg"}
            priority={index === 0}
            width={300}
            height={300}
            alt={name}
            className="max-h-[300px] object-cover rounded-lg"
          />
        </ImageKitProvider>
      </CardContent>
      <CardFooter className="w-full flex flex-col gap-4">

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}
              className="bg-transparent text-destructive hover:text-white shadow-none w-full"
            >
              {pet.userId === databaseUser?.id ? "Delete" : "Report"} This Post
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className='bg-red-600' onClick={() => handleDeletePost(pet.id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className="flex flex-col gap-2 w-full">
          <Link href={`/pets/${id}`} >
            <Button variant={"accent"} className="w-full!" >{`Visit this ${species ? species : "pet"}!`}</Button>
          </Link>
          {pet.userId === databaseUser?.id && (
            <>
              <GeneratePDF pet={pet} />
              <CreatePet pet={pet} />
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
