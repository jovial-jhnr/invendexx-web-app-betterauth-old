/*
  Warnings:

  - The primary key for the `shipping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `shippingmethod` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `orderId` to the `shipping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingAddress` to the `shipping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingMethodId` to the `shipping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `shipping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseCost` to the `shippingmethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryTime` to the `shippingmethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `shippingmethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `shippingmethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `shippingmethod` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ShippingStatus" AS ENUM ('PENDING', 'PROCESSING', 'LABEL_CREATED', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'RETURNED', 'FAILED');

-- AlterTable
ALTER TABLE "bankdetails" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "about" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "banner" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'GH',
ADD COLUMN     "email" TEXT,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "modifyProductState" BOOLEAN,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "storeApproval" BOOLEAN,
ADD COLUMN     "storeBaseCurrency" TEXT NOT NULL DEFAULT 'GH',
ADD COLUMN     "storeTag" TEXT,
ADD COLUMN     "storeUrl" TEXT,
ADD COLUMN     "tiktok" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "whitlabel" TEXT,
ADD COLUMN     "zipCode" TEXT;

-- AlterTable
ALTER TABLE "shipping" DROP CONSTRAINT "shipping_pkey",
ADD COLUMN     "actualDelivery" TIMESTAMP(3),
ADD COLUMN     "carrier" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dimensions" TEXT,
ADD COLUMN     "estimatedDelivery" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "shippingAddress" TEXT NOT NULL,
ADD COLUMN     "shippingFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "shippingMethodId" TEXT NOT NULL,
ADD COLUMN     "shippingZoneName" TEXT,
ADD COLUMN     "status" "ShippingStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "trackingNumber" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "shipping_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "shippingmethod" DROP CONSTRAINT "shippingmethod_pkey",
ADD COLUMN     "baseCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "carrier" TEXT,
ADD COLUMN     "costCalculation" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deliveryTime" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "storeId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "shippingmethod_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "emailVerified" DROP NOT NULL;

-- AlterTable
ALTER TABLE "wallet" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "featureflag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL,
    "rollout" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "featureflag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT,
    "downloadUrl" TEXT NOT NULL,
    "paymentLink" TEXT,
    "qrCode" TEXT,
    "amount" TEXT NOT NULL,
    "total" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "tax" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shippingzone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "countries" TEXT[],
    "regions" TEXT[],
    "postalCodes" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shippingzone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shippingaudit" (
    "id" TEXT NOT NULL,
    "shippingId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "metadata" JSONB,

    CONSTRAINT "shippingaudit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ShippingMethodToShippingZone" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ShippingMethodToShippingZone_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ShippingMethodToShippingZone_B_index" ON "_ShippingMethodToShippingZone"("B");

-- AddForeignKey
ALTER TABLE "cartitem" ADD CONSTRAINT "cartitem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping" ADD CONSTRAINT "shipping_shippingMethodId_fkey" FOREIGN KEY ("shippingMethodId") REFERENCES "shippingmethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shippingmethod" ADD CONSTRAINT "shippingmethod_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shippingzone" ADD CONSTRAINT "shippingzone_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shippingaudit" ADD CONSTRAINT "shippingaudit_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "shipping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShippingMethodToShippingZone" ADD CONSTRAINT "_ShippingMethodToShippingZone_A_fkey" FOREIGN KEY ("A") REFERENCES "shippingmethod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShippingMethodToShippingZone" ADD CONSTRAINT "_ShippingMethodToShippingZone_B_fkey" FOREIGN KEY ("B") REFERENCES "shippingzone"("id") ON DELETE CASCADE ON UPDATE CASCADE;
