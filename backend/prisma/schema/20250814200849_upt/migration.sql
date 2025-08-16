/*
  Warnings:

  - You are about to drop the `_LocationToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `storeId` to the `productcategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."_LocationToProduct" DROP CONSTRAINT "_LocationToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_LocationToProduct" DROP CONSTRAINT "_LocationToProduct_B_fkey";

-- AlterTable
ALTER TABLE "public"."product" ADD COLUMN     "locationId" TEXT;

-- AlterTable
ALTER TABLE "public"."productcategory" ADD COLUMN     "storeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."_LocationToProduct";

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."productcategory" ADD CONSTRAINT "productcategory_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
