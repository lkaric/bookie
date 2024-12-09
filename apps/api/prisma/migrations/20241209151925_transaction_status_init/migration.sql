-- CreateEnum
CREATE TYPE "ReconciliationStatus" AS ENUM ('PENDING', 'MATCHED', 'RECONCILED');

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "status" "ReconciliationStatus" NOT NULL DEFAULT 'PENDING';
