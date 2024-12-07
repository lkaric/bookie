import { Injectable, Logger } from '@nestjs/common';
import { AttachmentType, Statement } from '@prisma/client';
import { createId } from '@paralleldrive/cuid2';
import { MinioService } from 'nestjs-minio-client';

import { PrismaService } from '../prisma';

@Injectable()
class AttachmentService {
  private readonly logger = new Logger(AttachmentService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly minioService: MinioService
  ) {}

  async uploadStatement(
    xml: Express.Multer.File,
    bucket: string,
    statement: Statement,
    pdf?: Express.Multer.File
  ) {
    try {
      const exists = await this.minioService.client.bucketExists(bucket);

      if (!exists) {
        await this.minioService.client.makeBucket(bucket);
      }

      const xmlAttachment = await this.createAttachment(
        xml.originalname,
        bucket,
        AttachmentType.STATEMENT_XML,
        statement
      );

      await this.minioService.client.putObject(
        bucket,
        `${xmlAttachment.id}.xml`,
        xml.buffer
      );

      if (pdf) {
        const pdfAttachment = await this.createAttachment(
          pdf.originalname,
          bucket,
          AttachmentType.STATEMENT_PDF,
          statement
        );

        await this.minioService.client.putObject(
          bucket,
          `${pdfAttachment.id}.pdf`,
          pdf.buffer
        );
      }
    } catch (err) {
      this.logger.error(err);

      throw err;
    }
  }

  async createAttachment(
    name: string,
    bucket: string,
    type?: AttachmentType,
    statement?: Statement
  ) {
    try {
      const id = createId();
      const attachment = await this.prismaService.attachment.create({
        data: {
          id,
          name,
          bucket,
          type,
          statement: {
            connect: statement,
          },
        },
      });

      return attachment;
    } catch (err) {
      this.logger.error(err);

      throw err;
    }
  }

  async upload() {
    try {
      return this.minioService.client.makeBucket('');
    } catch (err) {
      this.logger.error(err);

      throw err;
    }
  }
}

export { AttachmentService };
