import { createYoga, createSchema } from "graphql-yoga";
import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

type EditUserArgs = {
  id: string;
  name?: string;
  email?: string;
};

type EditPetArgs = {
  id: string;
  name?: string;
  description?: string;
  age?: number;
  species?: string;
  imageUrl?: string;
};

type ParentUser = {
  id: string;
};

type ParentPet = {
  user_id?: string;
};

const schema = createSchema<{ req: NextRequest }>({
  typeDefs: `
    type User {
        id: ID!
        name: String!
        email: String!
        pet: Pet
    }

    type Pet {
        id: ID!
        name: String!
        description: String
        species: String
        age: Int
        imageUrl: String    
        createdAt: String
        user: User
    }

    type Query {
        users: [User!]!
        pets: [Pet!]!
    }

    type Mutation {
        addUser(name: String!, email: String!): User
        editUser(id: ID!, name: String, email: String): User

        addPet(name: String!, description: String, age: Int, species: String, imageUrl: String, userId: ID!): Pet
        editPet(id: ID!, name: String, description: String, age: Int, species: String, imageUrl: String): Pet
        deletePet(id: ID!): Pet
    }

    `,

  resolvers: {
    Query: {
      users: async () => {
        const { data, error } = await supabase.from("users").select("*");
        if (error) throw new Error(`Error querying users: ${error.message}`);
        return data;
      },
      pets: async () => {
        const { data, error } = await supabase.from("pets").select("*");
        if (error) throw new Error(`Error querying pets: ${error.message}`);
        return data;
      },
    },

    Pet: {
      user: async (parent: ParentPet) => {
        if (!parent.user_id) return null;
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", parent.user_id)
          .single();
        if (error) return null;
        return data;
      },
    },

    User: {
      pet: async (parent: ParentUser) => {
        const { data, error } = await supabase
          .from("pets")
          .select("*")
          .eq("user_id", parent.id)
          .maybeSingle();
        if (error) return null;
        return data;
      },
    },

    Mutation: {
      addUser: async (_: unknown, args: { name: string; email: string }) => {
        const { name, email } = args;

        // Check for existing user
        const { data: existingUser, error: checkError } = await supabase
          .from("users")
          .select("id")
          .eq("email", email)
          .single();

        if (checkError && checkError.code !== "PGRST116") {
          // Allow "no rows" error (not found), but throw others
          throw new Error(
            `Error checking existing user: ${checkError.message}`
          );
        }

        if (existingUser) {
          throw new Error(`User with email "${email}" already exists.`);
        }

        // Create new user
        const { data, error } = await supabase
          .from("users")
          .insert([{ name, email }])
          .select()
          .single();
        if (error) throw new Error(`Error creating user: ${error.message}`);
        return data;
      },
      editUser: async (_: unknown, args: EditUserArgs) => {
        const { id, name, email } = args;

        const updatedUser: Partial<EditUserArgs> = {};
        if (name !== undefined) updatedUser.name = name;
        if (email !== undefined) updatedUser.email = email;

        const { data, error } = await supabase
          .from("users")
          .update(updatedUser)
          .eq("id", id)
          .select()
          .single();

        if (error?.code === "PGRST116") {
          throw new Error(`User with id "${id}" not found.`);
        }
        if (error) throw new Error(`Error updating user: ${error.message}`);
        return data;
      },

      addPet: async (
        _: unknown,
        args: {
          name: string;
          description: string;
          age: number;
          species: string;
          imageUrl: string;
          userId: string;
        }
      ) => {
        const { name, description, age, species, imageUrl, userId } = args;

        if (!name || !userId) {
          throw new Error(
            "Missing required fields: 'name' and 'userId' are required."
          );
        }

        const { data, error } = await supabase
          .from("pets")
          .insert([{ name, description, age, species, imageUrl, userId }])
          .select()
          .single();
        if (error) throw new Error(`Error adding pet: ${error.message}`);
        return data;
      },
      editPet: async (_: unknown, args: EditPetArgs) => {
        const { id, name, description, age, species, imageUrl } = args;
        const updatedPet: Partial<EditPetArgs> = {};
        if (name !== undefined) updatedPet.name = name;
        if (description !== undefined) updatedPet.description = description;
        if (age !== undefined) updatedPet.age = age;
        if (species !== undefined) updatedPet.species = species;
        if (imageUrl !== undefined) updatedPet.imageUrl = imageUrl;

        const { data, error } = await supabase
          .from("pets")
          .update(updatedPet)
          .eq("id", id)
          .select()
          .single();
        if (error) throw new Error(`Error editing pet: ${error.message}`);
        return data;
      },

      deletePet: async (_: unknown, { id }: { id: string }) => {
        const { data, error } = await supabase
          .from("pets")
          .delete()
          .eq("id", id)
          .select()
          .single();

        if (error?.code === "PGRST116") {
          throw new Error(`Pet with id "${id}" not found.`);
        }
        if (error) throw new Error(`Error deleting pet: ${error.message}`);
        return data;
      },
    },
  },
});

const yoga = createYoga<{ req: NextRequest }>({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response },
});

export { yoga as GET, yoga as POST };
