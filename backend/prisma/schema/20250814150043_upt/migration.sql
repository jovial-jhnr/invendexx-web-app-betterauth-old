/*
  Warnings:

  - You are about to drop the column `quantitySize` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."product" DROP COLUMN "quantitySize",
ADD COLUMN     "productSize" TEXT;
