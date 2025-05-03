// app/api/pets/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const pet = await prisma.pet.findUnique({ where: { id: params.id } });
  if (!pet)
    return NextResponse.json({ error: "Pet not found" }, { status: 404 });
  return NextResponse.json(pet);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { name, description, species, age, imageUrl } = await req.json();

  const updatedPet = await prisma.pet.update({
    where: { id: params.id },
    data: { name, description, species, age, imageUrl },
  });

  return NextResponse.json(updatedPet);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.pet.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Pet deleted" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete pet" },
      { status: 500 }
    );
  }
}
