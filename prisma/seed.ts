import { Prisma, PrismaClient } from "@prisma/client";

// to seed the db
// npx prisma db seed
//
// View db
// npx prisma studio

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Zack Hanni",
    email: "zack.hanni@gmail.com",
    city: "Philadelphia",
    pets: {
      create: [
        {
          name: "Buddy",
          description: "Buddy loved to sit by the window and sun his pooch",
          species: "cat",
          age: 12,
          imageUrl: "/cats/001/buddy.jpg",
        },
      ],
    },
  },
  {
    name: "Emily Hanni",
    email: "stein.emilyj@gmail.com",
    city: "Miami",
    pets: {
      create: [
        {
          name: "Gibby",
          description:
            "She loves attention and the occasional play bite. She may look angry, but shes usually pretty sweet.",
          species: "cat",
          age: 6,
          imageUrl: "/cats/001/buddy2.jpg",
        },
      ],
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
