import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { getMonth, getYear } from 'date-fns';

import { RaiffeisenStatmentParserService } from './raiffeisen';
import { PrismaService } from '../prisma';
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
        statement: { accountNumber, ...parsedStatement },
        transactions,
      } = this.raiffeisenStatementParserService.parse(xml.buffer);

      const account = await this.prismaService.account.findFirst({
        where: { number: accountNumber },
      });

      if (!account) {
        throw new BadRequestException();
      }

      const statement = await this.prismaService.statement.create({
        data: {
          ...parsedStatement,
          account: { connect: account },
          transactions: { createMany: { data: transactions } },
        },
      });

      const bucket = `${getYear(parsedStatement.issueDate)}-${getMonth(
        parsedStatement.issueDate
      )}`;

      await this.attachmentService.uploadStatement(xml, bucket, statement, pdf);

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
