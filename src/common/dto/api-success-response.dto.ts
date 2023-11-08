import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class ApiSuccessResponseDTO<T> {
  @ApiProperty()
  @IsString()
  message;

  @ApiProperty()
  @IsObject()
  data: T;

  constructor(message: string, data: T) {
    this.message = message;
    this.data = data;
  }
}
