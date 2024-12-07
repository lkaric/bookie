import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { HealthModule } from './health';
import { PrismaModule } from './prisma';
import { IdentityModule } from './identity';
import { RedisModule } from './redis';

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
  ],
})
export class AppModule {}
