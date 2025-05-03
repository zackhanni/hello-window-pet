// app/api/pets/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const pets = await prisma.pet.findMany();
  return NextResponse.json(pets);
}

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
