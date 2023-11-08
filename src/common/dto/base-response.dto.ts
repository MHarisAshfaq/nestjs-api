import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsUUID } from 'class-validator';

export class BaseResponseDTO {
  @ApiProperty({ example: '123456789' })
  @IsUUID()
  id: number;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
