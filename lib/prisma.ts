import { PrismaClient } from "@prisma/client";

// This file creates a Prisma Client and attaches it to the global object so that only one instance of the client is created in your application. This helps resolve issues with hot reloading that can occur when using Prisma ORM with Next.js in development mode.

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
