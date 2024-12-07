import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AttachmentService } from './attachment.service';

@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          endPoint: config.get('MINIO_URL'),
          port: parseInt(config.get('MINIO_PORT')),
          useSSL: false,
          accessKey: config.get('MINIO_ACCESS_KEY'),
          secretKey: config.get('MINIO_SECRET_KEY'),
        };
      },
    }),
  ],
  providers: [AttachmentService],
  exports: [AttachmentService],
})
class AttachmentModule {}

export { AttachmentModule };
