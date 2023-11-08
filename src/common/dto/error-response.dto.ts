import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ErrorResponseDTO {
  @ApiProperty()
  @IsString()
  error: string;

  @ApiProperty()
  @IsString()
  message: string[];

  @ApiProperty()
  @IsNumber()
  statusCode: number;

  constructor(error: string, message: string[], statusCode: number) {
    this.error = error;
    this.message = message;
    this.statusCode = statusCode;
  }
}
