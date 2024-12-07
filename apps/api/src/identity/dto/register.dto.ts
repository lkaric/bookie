import { Prisma } from '@prisma/client';
import { IsEmail, IsJWT, IsString } from 'class-validator';

import type { TokenPair } from '../interfaces';

class RegisterRequest implements Prisma.UserCreateInput {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

class RegisterResponse implements TokenPair {
  @IsJWT()
  accessToken: string;

  @IsJWT()
  refreshToken: string;
}

export { RegisterRequest, RegisterResponse };
