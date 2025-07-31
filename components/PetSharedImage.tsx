"use client";

import React from "react";
import { Image } from "@imagekit/next";
import { Button } from "./ui/button";
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
} from "@/components/ui/alert-dialog";
import { useUserData } from "@/contexts/UserDataContext";
import { deletePetPhotoFromImagekit } from "@/lib/userAndPetHelpers";
import { useRouter } from "next/navigation";

interface PetPhoto {
  fileId: string;
  filePath: string;
  name: string;
  createdAt: string;
}

export const PetSharedImage = ({
  photo,
  pet,
}: {
  photo: PetPhoto;
  pet: Pet;
}) => {
  const { databaseUser } = useUserData();
  const router = useRouter();
  const handleRemovePhoto = async (fileId: string) => {
    console.log("Removing photo:", fileId);
    await deletePetPhotoFromImagekit(fileId);
    router.refresh();
  };

  return (
    <div key={photo.fileId} className="flex flex-col items-center">
      <p className="px-8 pb-2 text-sm">Taken {photo.createdAt}</p>
      <Image
        src={photo.filePath}
        width={300}
        height={300}
        alt={photo.name}
        className="rounded-lg"
      />
      {/* if the user logged in is the owner of the pet, show a delete button */}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"} className="w-min">
            {pet.userId === databaseUser?.id ? "Delete" : "Report"} This Photo
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
            <AlertDialogAction onClick={() => handleRemovePhoto(photo.fileId)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
