/*
  Warnings:

  - You are about to drop the column `freeShipping` on the `product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - The `discountPrice` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."product" DROP COLUMN "freeShipping",
ADD COLUMN     "isfreeShipping" BOOLEAN,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "discountPrice",
ADD COLUMN     "discountPrice" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "public"."domain" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "domainNames" TEXT[],
    "paymentStatus" TEXT,
    "paymentRef" TEXT,
    "lockStatus" TEXT NOT NULL,
    "domainPrice" DECIMAL(65,30),
    "pricePaid" DECIMAL(65,30),
    "isdomainRegistered" BOOLEAN NOT NULL,
    "domainProvider" TEXT,
    "expiryDate" TEXT NOT NULL,
    "failedReason" TEXT,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "domain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "domain_storeId_key" ON "public"."domain"("storeId");

-- AddForeignKey
ALTER TABLE "public"."domain" ADD CONSTRAINT "domain_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
