import { Body, Controller, Post } from '@nestjs/common';

import { AccountService } from './account.service';
import { CreateAccountRequest } from './dto';

@Controller('account')
class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  createAccount(@Body() body: CreateAccountRequest) {
    return this.accountService.create(body);
  }
}

export { AccountController };
