// app/api/users/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, name } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const newUser = await prisma.user.create({
    data: { email, name },
  });

  return NextResponse.json(newUser);
}

// export async function GET() {
//   const users = await prisma.user.findMany();
//   return NextResponse.json(users);
// }
