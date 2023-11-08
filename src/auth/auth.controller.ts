import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthLoginResponseDTO,
  AuthLoginDTO,
  AuthRegisterDTO,
  AuthRegisterResponseDTO,
} from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiSuccessResponseDecorator } from 'src/common/decorator/ApiSuccessResponse.decorator';
import { ApiSuccessResponseDTO, ErrorResponseDTO } from 'src/common/dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiSuccessResponseDecorator({
    status: HttpStatus.OK,
    description: 'register successfully',
    type: AuthLoginResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: ErrorResponseDTO,
  })
  async register(
    @Body() dto: AuthRegisterDTO,
  ): Promise<ApiSuccessResponseDTO<AuthRegisterResponseDTO>> {
    const response = await this.authService.register(dto);
    return new ApiSuccessResponseDTO('login successfully', response);
  }

  @Post('login')
  @ApiSuccessResponseDecorator({
    status: HttpStatus.OK,
    description: 'login successfully',
    type: AuthLoginResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: ErrorResponseDTO,
  })
  async login(
    @Body() dto: AuthLoginDTO,
  ): Promise<ApiSuccessResponseDTO<AuthLoginResponseDTO>> {
    const response = await this.authService.login(dto);
    return new ApiSuccessResponseDTO('login successfully', response);
  }
}
