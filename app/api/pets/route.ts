// app/api/pets/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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

export async function POST(req: Request) {
  try {
    const { userId, name, description, species, age } = await req.json();

    if (!userId || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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
  } catch (error) {
    console.error("Error creating pet:", error);
    return NextResponse.json(
      { error: "Failed to create pet" },
      { status: 500 }
    );
  }
}
