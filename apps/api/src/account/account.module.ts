import { Module } from '@nestjs/common';

import { AttachmentModule } from '../attachment';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [AttachmentModule],
  controllers: [AccountController],
  providers: [AccountService],
})
class AccountModule {}

export { AccountModule };
