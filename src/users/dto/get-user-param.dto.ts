import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUserParamDto {
  @ApiPropertyOptional({
    description: 'Get the user with this id',
    example: 1234,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number) // to transform the string to number in the validation
  id?: number;
}
