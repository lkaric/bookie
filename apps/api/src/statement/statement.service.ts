import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { getMonth, getYear } from 'date-fns';

import { PrismaService } from '../prisma';
import { RaiffeisenStatmentParserService } from './raiffeisen';
import { AttachmentService } from '../attachment';

@Injectable()
class StatementService {
  private readonly logger = new Logger(StatementService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly attachmentService: AttachmentService,
    private readonly raiffeisenStatementParserService: RaiffeisenStatmentParserService
  ) {}

  async import(xml: Express.Multer.File, pdf?: Express.Multer.File) {
    try {
      const {
        statement: { accountNumber, ...raw },
        transactions,
      } = this.raiffeisenStatementParserService.parse(xml.buffer);

      const account = await this.prismaService.account.findFirstOrThrow({
        where: { number: accountNumber },
      });

      const data: Prisma.StatementCreateInput = {
        ...raw,
        account: { connect: account },
      };

      const [statement] = await this.prismaService.$transaction([
        this.prismaService.statement.create({ data }),
      ]);

      const bucket = `${getYear(raw.issueDate)}-${getMonth(raw.issueDate)}`;

      await this.attachmentService.uploadStatement(xml, bucket, statement, pdf);

      const transactionData: Array<Prisma.TransactionCreateManyInput> =
        transactions.map((transaction) => ({
          ...transaction,
          statementId: statement.id,
        }));

      await this.prismaService.transaction.createMany({
        data: transactionData,
      });

      return statement;
    } catch (err) {
      this.logger.error(err);

      throw err;
    }
  }

  async findById(id: string) {
    try {
      return await this.prismaService.statement.findUnique({
        where: { id },
        include: {
          account: true,
          attachments: true,
          transactions: true,
        },
      });
    } catch (err) {
      this.logger.error(err);

      throw err;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.statement.findMany();
    } catch (err) {
      this.logger.error(err);

      throw err;
    }
  }
}

export { StatementService };
