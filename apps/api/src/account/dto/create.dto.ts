import { Prisma, Account } from '@prisma/client';
import { IsDateString, IsISO4217CurrencyCode, IsString } from 'class-validator';

class CreateAccountRequest implements Prisma.AccountCreateInput {
  @IsString()
  name: string;

  @IsString()
  number: string;

  @IsISO4217CurrencyCode()
  currency: string;
}

class CreateAccountResponse implements Account {
  @IsString()
  id: string;
  @IsString()
  name: string;

  @IsString()
  number: string;

  @IsISO4217CurrencyCode()
  currency: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}

export { CreateAccountRequest, CreateAccountResponse };
