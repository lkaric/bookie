import { Prisma } from '@prisma/client';

interface ParsedStatementInterface {
  statement: Prisma.StatementCreateWithoutAccountInput & {
    accountNumber: string;
  };
  transactions: Array<Prisma.TransactionCreateWithoutAttachmentsInput>;
}

export type { ParsedStatementInterface };
