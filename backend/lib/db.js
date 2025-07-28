import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/prisma/index.js";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// Initialize Prisma Client with the custom adapter
const prisma = new PrismaClient({ adapter });

// Optional: Catch Prisma Client errors
prisma.$on("error", (e) => {
  console.error("Prisma Client error:", e.message);
});

// Optional: Add default export if needed
export default prisma;
