"use server"; // does this fix the wierd issues?

import imagekit from "./imagekit";
import { prisma } from "@/lib/prisma";

export async function getCatById(id: string) {
  return await prisma.pet.findUnique({ where: { id: id } });
}

export async function getAllCats() {
  return await prisma.pet.findMany();
}

export async function userExists(email: string) {
  const user = getUserByEmail(email);
  if (!user) return false;
  return true;
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email: email } });
}

export async function getUserPetsByEmail(email: string) {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error(`User with email ${email} not found.`);
  }
  return await prisma.pet.findMany({ where: { userId: user.id } });
}

function convertFromZuluTime(zuluString: string) {
  return new Date(zuluString);
}

export const getAnimalPhotos = async (AnimalId: string) => {
  try {
    const result = await imagekit.listFiles({
      path: `pets/${AnimalId}`,
    });

    return result.map((file) => {
      // limit to only 10 images
      // sort images by date. newest first

      return {
        filePath: file.filePath,
        fileId: file.fileId,
        name: file.name,
        createdAt: convertFromZuluTime(file.createdAt).toString(),
      };
    });
  } catch (error) {
    console.error("Failed to fetch cat photos", error);
    return [];
  }
};

//
//
//

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

export async function AddAnimalToDB(animalData: Animal, userId: string) {
  console.log("cats animal data: ", animalData);
  console.log("cats userId: ", userId);
  const { name, description, species, age } = animalData;

  return await prisma.pet.create({
    data: {
      userId: userId,
      name: name,
      description: description,
      species: species,
      age: age,
      imageUrl: null,
    },
  });
}
