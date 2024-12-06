import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { HealthModule } from './health';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    HealthModule,
  ],
})
export class AppModule {}
