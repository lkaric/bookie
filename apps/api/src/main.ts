import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const prefix = configService.get('APPLICATION_PREFIX');
  const env = configService.get('APPLICATION_ENV');
  const port = parseInt(configService.get('APPLICATION_PORT') ?? '4200', 10);

  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ValidationPipe());

  app.use(helmet());

  await app.listen(port, () => {
    if (env === 'local') {
      Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${prefix}`
      );
      Logger.log(
        `🏥 Health check is running on: http://localhost:${port}/${prefix}/health`
      );
    }
  });
}

bootstrap();
