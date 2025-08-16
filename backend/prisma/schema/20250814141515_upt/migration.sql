/*
  Warnings:

  - You are about to drop the column `productCategoryId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_productCategoryId_fkey";

-- AlterTable
ALTER TABLE "public"."product" DROP COLUMN "productCategoryId";

-- CreateTable
CREATE TABLE "public"."_ProductToProductCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProductToProductCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProductToProductCategory_B_index" ON "public"."_ProductToProductCategory"("B");

-- AddForeignKey
ALTER TABLE "public"."_ProductToProductCategory" ADD CONSTRAINT "_ProductToProductCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductToProductCategory" ADD CONSTRAINT "_ProductToProductCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."productcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
