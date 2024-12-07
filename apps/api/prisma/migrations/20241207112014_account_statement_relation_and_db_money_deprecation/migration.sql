/*
  Warnings:

  - You are about to alter the column `openingBalance` on the `statements` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(65,30)`.
  - You are about to alter the column `closingBalance` on the `statements` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(65,30)`.
  - Added the required column `accountId` to the `statements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "statements" ADD COLUMN     "accountId" TEXT NOT NULL,
ALTER COLUMN "openingBalance" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "closingBalance" SET DATA TYPE DECIMAL(65,30);

-- AddForeignKey
ALTER TABLE "statements" ADD CONSTRAINT "statements_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
