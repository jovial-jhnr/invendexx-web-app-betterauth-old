/*
  Warnings:

  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `discountedPrice` on the `product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - The `length` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `width` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `height` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `productcategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `productId` to the `inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouseId` to the `inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_productCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_purchaseOrderId_fkey";

-- AlterTable
ALTER TABLE "public"."inventory" ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "warehouseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."product" ADD COLUMN     "hasVariation" BOOLEAN,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "discountedPrice" SET DATA TYPE DECIMAL(65,30),
DROP COLUMN "length",
ADD COLUMN     "length" DOUBLE PRECISION,
DROP COLUMN "width",
ADD COLUMN     "width" DOUBLE PRECISION,
DROP COLUMN "height",
ADD COLUMN     "height" DOUBLE PRECISION,
ALTER COLUMN "productCategoryId" DROP NOT NULL,
ALTER COLUMN "productCategoryId" SET DATA TYPE TEXT,
ALTER COLUMN "purchaseOrderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."productcategory" DROP CONSTRAINT "productcategory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "productcategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "productcategory_id_seq";

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "public"."purchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "public"."productcategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."inventory" ADD CONSTRAINT "inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."inventory" ADD CONSTRAINT "inventory_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "public"."warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
