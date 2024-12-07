-- AlterTable
ALTER TABLE "attachments" ADD COLUMN     "transactionId" TEXT;

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "internalId" TEXT,
    "client" TEXT NOT NULL,
    "clientAccountNumber" TEXT NOT NULL,
    "clientModelNumber" TEXT,
    "clientCallNumber" TEXT,
    "place" TEXT,
    "amount" DECIMAL(65,30) NOT NULL,
    "paymentCode" TEXT NOT NULL,
    "paymentCodeDescription" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "statementId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transactions_reference_key" ON "transactions"("reference");

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_statementId_fkey" FOREIGN KEY ("statementId") REFERENCES "statements"("id") ON DELETE SET NULL ON UPDATE CASCADE;
