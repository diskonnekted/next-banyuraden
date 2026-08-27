import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
    globalForPrisma.prisma ??
    (process.env.DATABASE_URL
        ? new PrismaClient({
              log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
          })
        : ({} as PrismaClient));

if (!globalForPrisma.prisma && process.env.DATABASE_URL) {
    globalForPrisma.prisma = prisma;
}
