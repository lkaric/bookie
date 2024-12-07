import { registerAs } from '@nestjs/config';

export const minioConfig = registerAs('minio', () => ({
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
  url: process.env.MINIO_URL,
  port: process.env.MINIO_PORT,
}));
