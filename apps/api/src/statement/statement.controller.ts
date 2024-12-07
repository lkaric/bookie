import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { StatementService } from './statement.service';

@Controller('statement')
class StatementController {
  constructor(private readonly statementService: StatementService) {}

  @Post('/import')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'xml', maxCount: 1 },
      { name: 'pdf', maxCount: 1 },
    ])
  )
  importStatement(
    @UploadedFiles()
    files: {
      xml: Express.Multer.File[];
      pdf?: Express.Multer.File[];
    }
  ) {
    return this.statementService.import(files.xml[0], files?.pdf?.[0]);
  }

  @Get('/')
  findStatements() {
    return this.statementService.findAll();
  }

  @Get('/:id')
  findStatementById(@Param('id') id: string) {
    return this.statementService.findById(id);
  }
}

export { StatementController };
