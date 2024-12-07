/*
  Warnings:

  - You are about to drop the column `path` on the `attachments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[internalId]` on the table `statements` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "attachments" DROP COLUMN "path",
ADD COLUMN     "url" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "statements_internalId_key" ON "statements"("internalId");
