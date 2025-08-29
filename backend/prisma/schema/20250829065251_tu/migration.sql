/*
  Warnings:

  - You are about to drop the column `businessType` on the `organization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."account" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."organization" DROP COLUMN "businessType",
ADD COLUMN     "businessCategory" TEXT;
