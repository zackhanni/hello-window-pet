// app/api/pets/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Test database connection
    try {
      await prisma.$connect();
    } catch (dbError) {
      console.error("Database connection failed:", dbError);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const pet = await prisma.pet.findUnique({ where: { id } });
    if (!pet)
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    return NextResponse.json(pet);
  } catch (error) {
    console.error("Error fetching pet:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch pet",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, description, species, age, imageUrl } = await req.json();

    // Test database connection
    try {
      await prisma.$connect();
    } catch (dbError) {
      console.error("Database connection failed:", dbError);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const updatedPet = await prisma.pet.update({
      where: { id },
      data: { name, description, species, age, imageUrl },
    });

    return NextResponse.json(updatedPet);
  } catch (error) {
    console.error("Error updating pet:", error);
    return NextResponse.json(
      {
        error: "Failed to update pet",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Test database connection
    try {
      await prisma.$connect();
    } catch (dbError) {
      console.error("Database connection failed:", dbError);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    await prisma.pet.delete({ where: { id } });
    return NextResponse.json({ message: "Pet deleted" });
  } catch (error) {
    console.error("Error deleting pet:", error);
    return NextResponse.json(
      {
        error: "Failed to delete pet",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
