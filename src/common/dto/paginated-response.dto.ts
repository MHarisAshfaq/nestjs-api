import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class PaginatedResponseDTO<T> {
  @ApiProperty()
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsArray()
  results: T[];

  @ApiProperty()
  @IsNumber()
  totalCount: number;
}
