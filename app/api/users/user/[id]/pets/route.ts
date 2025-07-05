// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(
//   _: Request,
//   { params }: { params: { userId: string } }
// ) {
//   //   const { userId } = params;

//   const pets = await prisma.pet.findMany({
//     where: { userId: params.userId },
//   });

//   if (!pets)
//     return NextResponse.json(
//       { error: "No pets found for user" },
//       { status: 404 }
//     );

//   return NextResponse.json(pets);
// }

//
//
//

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = id;

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const pets = await prisma.pet.findMany({
      where: { userId },
    });

    return NextResponse.json(pets);
  } catch (error) {
    console.error("Error fetching pets:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

//
//
//

// import { prisma } from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   req: NextRequest,
//   context: { params: { id: string } }
// ) {
//   const userId = context.params.id;

//   if (!userId) {
//     return NextResponse.json({ error: "Missing userId" }, { status: 400 });
//   }

//   try {
//     const pets = await prisma.pet.findMany({
//       where: { userId },
//     });

//     return NextResponse.json(pets);
//   } catch (error) {
//     console.error("Error fetching pets:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
