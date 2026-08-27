import { PrismaClient } from "@prisma/client";

// Prisma is optional - only used if DATABASE_URL is available
// This app primarily fetches data from external APIs (banyuraden.id, etc.)
let prismaClient: PrismaClient | undefined;

if (process.env.DATABASE_URL) {
    const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

    prismaClient =
        globalForPrisma.prisma ??
        new PrismaClient({
            log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
        });

    if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = prismaClient;
    }
}

export const prisma = prismaClient as PrismaClient;
