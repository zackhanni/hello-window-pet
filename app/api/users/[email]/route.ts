import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await params;

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
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

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log("User not found:", email);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("User found:", { id: user.id, email: user.email });
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error finding user:", error);
    return NextResponse.json(
      {
        error: "Failed to find user",
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
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await params;
    await prisma.user.delete({ where: { email } });
    return NextResponse.json({ message: "User deleted" });
  } catch (err) {
    console.log("Error deleting user:", err);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
