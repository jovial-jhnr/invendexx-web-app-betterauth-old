/*
  Warnings:

  - You are about to drop the column `discountedPrice` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."product" DROP COLUMN "discountedPrice",
ADD COLUMN     "discountPrice" DECIMAL(65,30);
