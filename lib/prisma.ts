import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { 
  prisma?: PrismaClient 
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" 
      ? ["query", "error", "warn"] 
      : ["error"],
    errorFormat: 'minimal',
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Ensure connection is established with retry
if (typeof window === 'undefined') {
  let retries = 3;
  const connectWithRetry = async () => {
    try {
      await prisma.$connect();
      console.log("✓ Database connected successfully");
    } catch (error) {
      console.error("✗ Database connection failed:", error instanceof Error ? error.message : error);
      if (retries > 0) {
        retries--;
        console.log(`Retrying connection... (${retries} attempts left)`);
        setTimeout(connectWithRetry, 2000);
      } else {
        console.error("DATABASE_URL:", process.env.DATABASE_URL ? "Set (check format)" : "Not set");
      }
    }
  };
  connectWithRetry();
}

// Handle graceful shutdown
if (typeof window === 'undefined') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect();
  });
  
  process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}
