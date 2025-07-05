// app/api/pets/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const pet = await prisma.pet.findUnique({ where: { id } });
  if (!pet)
    return NextResponse.json({ error: "Pet not found" }, { status: 404 });
  return NextResponse.json(pet);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { name, description, species, age, imageUrl } = await req.json();

  const updatedPet = await prisma.pet.update({
    where: { id },
    data: { name, description, species, age, imageUrl },
  });

  return NextResponse.json(updatedPet);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.pet.delete({ where: { id } });
    return NextResponse.json({ message: "Pet deleted" });
  } catch (err) {
    console.log("Error deleting pet:", err);
    return NextResponse.json(
      { error: "Failed to delete pet" },
      { status: 500 }
    );
  }
}
