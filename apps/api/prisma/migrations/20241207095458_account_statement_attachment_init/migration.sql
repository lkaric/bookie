-- CreateEnum
CREATE TYPE "AttachmentType" AS ENUM ('STATEMENT_PDF', 'STATEMENT_XML', 'OTHER');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statements" (
    "id" TEXT NOT NULL,
    "internalId" TEXT NOT NULL,
    "internalNumber" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "openingBalance" MONEY NOT NULL,
    "closingBalance" MONEY NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "statements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AttachmentType" NOT NULL DEFAULT 'OTHER',
    "mimeType" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "description" TEXT,
    "statementId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "accounts_number_idx" ON "accounts"("number");

-- CreateIndex
CREATE INDEX "statements_internalId_idx" ON "statements"("internalId");

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_statementId_fkey" FOREIGN KEY ("statementId") REFERENCES "statements"("id") ON DELETE SET NULL ON UPDATE CASCADE;
