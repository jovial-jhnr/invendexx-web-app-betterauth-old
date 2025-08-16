import { defineConfig } from "prisma/config";
import "dotenv/config";
// import path from "node:path"

export default defineConfig({
  schema: "./prisma/schema/schema.prisma",
  migrations: {
    path: "./prisma/schema",
  },
  view: {
    path: "./prisma/views",
  },
});
