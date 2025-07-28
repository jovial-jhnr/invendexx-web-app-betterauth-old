/*
  Warnings:

  - You are about to drop the column `about` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `whitlabel` on the `organization` table. All the data in the column will be lost.
  - You are about to alter the column `shippingFee` on the `shipping` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_storeId_fkey";

-- AlterTable
ALTER TABLE "organization" DROP COLUMN "about",
DROP COLUMN "whitlabel",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "whitelabel" TEXT;

-- AlterTable
ALTER TABLE "shipping" ALTER COLUMN "shippingFee" SET DATA TYPE DECIMAL(65,30);

-- DropTable
DROP TABLE "Invoice";

-- CreateTable
CREATE TABLE "invoice" (
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

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
