// app/api/pets/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// get all animals
export async function GET() {
  const pets = await prisma.pet.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: 0, // for pagination
    take: 10,
  });

  // sort in reverse
  return NextResponse.json(pets);
}

// add animal to DB
export async function POST(req: Request) {
  const { userId, name, description, species, age } = await req.json();
  const newPet = await prisma.pet.create({
    data: {
      userId,
      name,
      description,
      species,
      age,
      imageUrl: null,
    },
  });
  return NextResponse.json(newPet);
}
