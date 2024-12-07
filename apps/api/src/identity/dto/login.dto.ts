import { IsEmail, IsJWT, IsString } from 'class-validator';

import { TokenPair } from '../interfaces';

class LoginRequest {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
class LoginResponse implements TokenPair {
  @IsJWT()
  accessToken: string;

  @IsJWT()
  refreshToken: string;
}

export { LoginRequest, LoginResponse };
