import { Body, Controller, Post } from '@nestjs/common';

import { IdentityService } from './services';
import { Public } from './decorators';
import { LoginRequest, RefreshRequest, RegisterRequest } from './dto';

@Public()
@Controller('identity')
class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('/register')
  register(@Body() body: RegisterRequest) {
    return this.identityService.register(body);
  }

  @Post('/login')
  login(@Body() body: LoginRequest) {
    return this.identityService.login(body);
  }

  @Post('/refresh')
  refresh(@Body() body: RefreshRequest) {
    return this.identityService.refresh(body);
  }
}

export { IdentityController };
