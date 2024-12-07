import { Injectable } from '@nestjs/common';
import { ParsedStatementInterface } from './interfaces';

@Injectable()
abstract class StatementParserService {
  abstract parse(
    payload: string | Buffer
  ): ParsedStatementInterface;
}

export { StatementParserService };
