import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Test connection on startup
if (process.env.NODE_ENV === "production") {
  prisma.$connect()
    .then(() => {
      console.log("✓ Database connected successfully");
    })
    .catch((error) => {
      console.error("✗ Database connection failed:", error.message);
    });
}
