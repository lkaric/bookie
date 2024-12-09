import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { HealthModule } from './health';
import { PrismaModule } from './prisma';
import { IdentityModule } from './identity';
import { RedisModule } from './redis';
import { AttachmentModule } from './attachment';
import { StatementModule } from './statement';
import { AccountModule } from './account';
import { TransactionModule } from './transaction';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    RedisModule,
    HealthModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    IdentityModule,
    AttachmentModule,
    AccountModule,
    StatementModule,
    TransactionModule,
  ],
})
export class AppModule {}
