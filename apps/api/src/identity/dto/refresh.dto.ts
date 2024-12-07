import { IsJWT } from 'class-validator';

import type { TokenPair } from '../interfaces';

class RefreshRequest {
  @IsJWT()
  refreshToken: string;
}

class RefreshResponse implements TokenPair {
  @IsJWT()
  accessToken: string;

  @IsJWT()
  refreshToken: string;
}

export { RefreshRequest, RefreshResponse };
