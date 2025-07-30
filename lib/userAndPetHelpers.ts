"use server";

import imagekit from "./imagekit";
import { supabase } from "@/lib/supabase";
import { client } from "@/lib/graphqlClient";
import { gql } from "graphql-request";

//
// User Related
//

// export async function userExists(email: string) {
//   const user = await getUserByEmail(email);
//   if (!user) return false;
//   return true;
// }

// export async function getUserByEmail(email: string) {
//   try {
//     const { data, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .single();

//     if (error) {
//       console.error("Error fetching user:", error);
//       return null;
//     }

//     return data;
//   } catch (error) {
//     console.error("Error in getUserByEmail:", error);
//     return null;
//   }
// }

export const getUser = async (email: string) => {
  const query = `
  query {
    user(email: "${email}") {
      id
      name
      email
      pets {
        id
        userId
        name
        species
        imageUrl
        description
        species
        age
        createdAt
      }
    }
  }
`;
  const { user } = await client.request<{ user: DatabaseUser }>(query);
  return user;
};

// export async function addUserToDB(user: SessionUser) {
//   const { email, name } = user;

//   try {
//     const { data, error } = await supabase
//       .from("users")
//       .insert({
//         email: email,
//         name: name,
//       })
//       .select()
//       .single();

//     if (error) {
//       console.error("Error creating user:", error);
//       throw new Error(`Failed to create user: ${error.message}`);
//     }

//     return data;
//   } catch (error) {
//     console.error("Error in addUserToDB:", error);
//     throw error;
//   }
// }

//
// Animal related
//

// export async function getUserPetsByEmail(user: SessionUser) {
//   let databaseUser = await getUserByEmail(user.email);
//   if (!databaseUser) {
//     try {
//       const newUser = await addUserToDB(user);
//       databaseUser = newUser;
//     } catch (error) {
//       throw new Error(
//         `User with email ${user.email} not found: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }

//   try {
//     const { data, error } = await supabase
//       .from("pets")
//       .select("*")
//       .eq("user_id", databaseUser.id);

//     if (error) {
//       console.error("Error fetching pets:", error);
//       return [];
//     }

//     return data || [];
//   } catch (error) {
//     console.error("Error in getUserPetsByEmail:", error);
//     return [];
//   }
// }

export const addUser = async (user: { name: string; email: string }) => {
  const { name, email } = user;
  const query = gql`
  mutation AddUser($name: String!, $email: String!) {
    addUser(name: "${name}", email: "${email}") {
      id
      name
      email
    }
  }
`;

  const variables = {
    name: user.name,
    email: user.email,
  };

  const { addUser } = await client.request<{
    addUser: { id: string; name: string; email: string };
  }>(query, variables);
  return addUser;
};

export const getUserPets = async (id: string) => {
  const query = `
  query {
    userPets(userId: "${id}") {
      id
      name
      species
      imageUrl
      description
    }
  }
`;
  const { userPets } = await client.request<{ userPets: Pet[] }>(query);
  return userPets;
};

// export async function getPetById(id: string) {
//   try {
//     const { data, error } = await supabase
//       .from("pets")
//       .select("*")
//       .eq("id", id)
//       .single();

//     if (error) {
//       console.error("Error fetching pet:", error);
//       return null;
//     }

//     return data;
//   } catch (error) {
//     console.error("Error in getPetById:", error);
//     return null;
//   }
// }

export const getPetById = async (id: string) => {
  const query = `
  query {
    pet(id: "${id}") {
      id
      name
      species
      imageUrl
      description
    }
  }
`;
  const { pet } = await client.request<{ pet: Pet }>(query);
  return pet;
};

export const getAllPets = async () => {
  const query = `
    query {
      pets {
        id
        name
        species
        imageUrl
        description
      }
    }
  `;
  const { pets } = await client.request<{ pets: Pet[] }>(query);
  return pets;
};

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
  try {
    const { data, error } = await supabase
      .from("pets")
      .update({ image_url: imageUrl })
      .eq("id", petId)
      .select()
      .single();

    if (error) {
      console.error("Error updating pet image:", error);
      throw new Error(`Failed to update pet image: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error in changePetImage:", error);
    throw error;
  }
}

export async function updatePet(petId: string, updatedAnimalData: Pet) {
  const { name, description, species, age, imageUrl } = updatedAnimalData;

  try {
    const { data, error } = await supabase
      .from("pets")
      .update({
        name: name,
        description: description,
        species: species,
        age: age,
        image_url: imageUrl,
      })
      .eq("id", petId)
      .select()
      .single();

    if (error) {
      console.error("Error updating pet:", error);
      throw new Error(`Failed to update pet: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error in updatePet:", error);
    throw error;
  }
}
