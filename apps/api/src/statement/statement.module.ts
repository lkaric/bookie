import { Module } from '@nestjs/common';

import { AttachmentModule } from '../attachment';
import { StatementController } from './statement.controller';
import { StatementService } from './statement.service';
import { RaiffeisenStatmentParserService } from './raiffeisen';

@Module({
  imports: [AttachmentModule],
  controllers: [StatementController],
  providers: [StatementService, RaiffeisenStatmentParserService],
})
class StatementModule {}

export { StatementModule };
