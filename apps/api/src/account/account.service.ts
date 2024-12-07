import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '../prisma';
import { CreateAccountRequest, CreateAccountResponse } from './dto';

@Injectable()
class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateAccountRequest): Promise<CreateAccountResponse> {
    try {
      const data = { ...payload };

      return this.prismaService.account.create({ data });
    } catch (err) {
      this.logger.error(err);

      throw err;
    }
  }
}

export { AccountService };
