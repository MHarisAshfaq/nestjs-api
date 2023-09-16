import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  @ApiCreatedResponse({ description: 'User registered' })
  register(@Body() dto: SignUpDto) {
    return this.authService.register(dto);
  }
  @Post('login')
  @ApiOkResponse()
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
