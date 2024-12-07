import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { jwtConfig } from '../config';
import { IdentityController } from './identity.controller';
import { HashingService, ArgonService, IdentityService } from './services';
import { JwtStrategy } from './strategies';
import { JwtGuard } from './guards';
import { Public } from './decorators';

@Public()
@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [IdentityController],
  providers: [
    {
      provide: HashingService,
      useClass: ArgonService,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    IdentityService,
    JwtStrategy,
  ],
})
class IdentityModule {}

export { IdentityModule };
