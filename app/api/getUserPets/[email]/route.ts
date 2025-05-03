import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { email: string } }
) {
  const user = await prisma.user.findUnique({ where: { email: params.email } });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const pets = await prisma.pet.findMany({ where: { userId: user.id } });

  console.log("USER: ", user);
  console.log("PETS: ", pets);
  return NextResponse.json(pets);
}
