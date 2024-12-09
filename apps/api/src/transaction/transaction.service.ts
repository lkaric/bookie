import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '../prisma';

@Injectable()
class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    try {
      return await this.prismaService.transaction.findMany();
    } catch (err) {
      this.logger.error(err);

      throw err;
    }
  }

  async findById(id: string) {
    try {
      return await this.prismaService.transaction.findUnique({
        where: { id },
        include: {
          attachments: true,
        },
      });
    } catch (err) {
      this.logger.error(err);

      throw err;
    }
  }
}

export { TransactionService };
