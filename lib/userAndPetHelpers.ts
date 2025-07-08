"use server"; // does this fix the weird issues?

import imagekit from "./imagekit";
import { prisma } from "@/lib/prisma";

//
// User Related
//

export async function userExists(email: string) {
  const user = getUserByEmail(email);
  if (!user) return false;
  return true;
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email: email } });
}

export async function addUserToDB(user: SessionUser) {
  const { email, name } = user;

  const newUser = await prisma.user.create({
    data: {
      email: email,
      name: name,
    },
  });
  return newUser;
}

//
// Animal related
//

export async function getUserPetsByEmail(user: SessionUser) {
  let databaseUser = await getUserByEmail(user.email);
  if (!databaseUser) {
    try {
      const newUser = await addUserToDB(user);
      databaseUser = newUser;
    } catch (error) {
      throw new Error(
        `User with email ${user.email} not found: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
  return await prisma.pet.findMany({ where: { userId: databaseUser.id } });
}

export async function getPetById(id: string) {
  return await prisma.pet.findUnique({ where: { id: id } });
}

// export async function getAllCats() {
//   return await prisma.pet.findMany();
// }

function convertFromZuluTime(zuluString: string) {
  return new Date(zuluString);
}

export const getPetPhotos = async (petId: string) => {
  try {
    const result = await imagekit.listFiles({
      path: `pets/${petId}`,
    });

    return result
      .filter((file) => "filePath" in file && "fileId" in file)
      .map(
        (file: {
          filePath: string;
          fileId: string;
          name: string;
          createdAt: string;
        }) => {
          // limit to only 10 images
          // sort images by date. newest first

          return {
            filePath: file.filePath,
            fileId: file.fileId,
            name: file.name,
            createdAt: convertFromZuluTime(file.createdAt).toString(),
          };
        }
      );
  } catch (error) {
    console.error("Failed to fetch cat photos", error);
    return [];
  }
};

export const deletePetPhotoFromImagekit = async (fileId: string) => {
  try {
    await imagekit.deleteFile(fileId);
  } catch (error) {
    console.error("Failed to delete photo from imagekit", error);
  }
};

export async function changePetImage(petId: string, imageUrl: string) {
  const updatedAnimal = await prisma.pet.update({
    where: {
      id: petId,
    },
    data: {
      imageUrl: imageUrl,
    },
  });

  return updatedAnimal;
}

export async function updatePet(petId: string, updatedAnimalData: Pet) {
  const { name, description, species, age, imageUrl } = updatedAnimalData;

  const updatedAnimal = await prisma.pet.update({
    where: {
      id: petId,
    },
    data: {
      name: name,
      description: description,
      species: species,
      age: age,
      imageUrl: imageUrl,
    },
  });

  return updatedAnimal;
}
