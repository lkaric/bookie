import { Controller, Get, Param, Patch } from '@nestjs/common';

import { TransactionService } from './transaction.service';

@Controller('transaction')
class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/')
  findTransactions() {
    return this.transactionService.findAll();
  }

  @Get('/:id')
  findTransactionById(@Param('id') id: string) {
    return this.transactionService.findById(id);
  }
}

export { TransactionController };
