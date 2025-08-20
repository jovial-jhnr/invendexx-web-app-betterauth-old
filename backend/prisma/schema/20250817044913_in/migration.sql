/*
  Warnings:

  - You are about to drop the column `productId` on the `productcategory` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `productvariation` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `productvariation` table. All the data in the column will be lost.
  - Made the column `sku` on table `productvariation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `productvariation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stock` on table `productvariation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."bankdetails" DROP CONSTRAINT "bankdetails_storeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."location" DROP CONSTRAINT "location_storeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_locationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_purchaseOrderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_storeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_warehouseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."productcategory" DROP CONSTRAINT "productcategory_storeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."productvariation" DROP CONSTRAINT "productvariation_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user" DROP CONSTRAINT "user_locationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."wallet" DROP CONSTRAINT "wallet_storeId_fkey";

-- AlterTable
ALTER TABLE "public"."featuredbrands" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."productcategory" DROP COLUMN "productId",
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."productcollection" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."productvariation" DROP COLUMN "color",
DROP COLUMN "size",
ADD COLUMN     "cost" DOUBLE PRECISION,
ADD COLUMN     "discountPrice" DOUBLE PRECISION,
ALTER COLUMN "sku" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "stock" SET NOT NULL,
ALTER COLUMN "stock" SET DEFAULT 0,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."productvariant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productvariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."productvariantvalue" (
    "id" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productvariantvalue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."productvariantoption" (
    "id" TEXT NOT NULL,
    "variationId" TEXT NOT NULL,
    "valueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productvariantoption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "productvariantoption_variationId_valueId_key" ON "public"."productvariantoption"("variationId", "valueId");

-- AddForeignKey
ALTER TABLE "public"."bankdetails" ADD CONSTRAINT "bankdetails_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."wallet" ADD CONSTRAINT "wallet_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."location" ADD CONSTRAINT "location_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."productcollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "public"."purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "public"."warehouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."productcategory" ADD CONSTRAINT "productcategory_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."productvariation" ADD CONSTRAINT "productvariation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."productvariantvalue" ADD CONSTRAINT "productvariantvalue_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "public"."productvariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."productvariantoption" ADD CONSTRAINT "productvariantoption_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "public"."productvariation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."productvariantoption" ADD CONSTRAINT "productvariantoption_valueId_fkey" FOREIGN KEY ("valueId") REFERENCES "public"."productvariantvalue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
