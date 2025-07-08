// app/api/pets/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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

    const pets = await prisma.pet.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: 0, // for pagination
      take: 10,
    });

    return NextResponse.json(pets);
  } catch (error) {
    console.error("Error fetching pets:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch pets",
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

export async function POST(req: Request) {
  try {
    const { userId, name, description, species, age } = await req.json();

    if (!userId || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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
      {
        error: "Failed to create pet",
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
