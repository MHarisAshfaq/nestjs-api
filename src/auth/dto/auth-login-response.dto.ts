import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { BaseResponseDTO } from '../../common/dto';

class User extends BaseResponseDTO {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEmpty()
  firstName: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEmpty()
  lastName: string | null;
}

export class AuthLoginResponseDTO {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsObject()
  user: User;
}
