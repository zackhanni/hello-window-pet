import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();

    // Test a simple query
    const userCount = await prisma.user.count();
    const petCount = await prisma.pet.count();

    await prisma.$disconnect();

    return NextResponse.json({
      status: "healthy",
      database: "connected",
      userCount,
      petCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      {
        status: "unhealthy",
        database: "disconnected",
        error:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : "Database connection failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
