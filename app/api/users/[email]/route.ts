import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  const { email } = await params;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json(user);
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
