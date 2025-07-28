-- AlterTable
ALTER TABLE "organization" ALTER COLUMN "currency" DROP NOT NULL,
ALTER COLUMN "storeBaseCurrency" DROP NOT NULL;
