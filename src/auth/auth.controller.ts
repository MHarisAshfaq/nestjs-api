import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() dto: SignUpDto) {
    return this.authService.register(dto);
  }
  @Post('login')
  login(@Body() dto: SignUpDto) {
    return this.authService.login(dto);
  }
}
