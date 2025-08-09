import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSocialProfileValueDto {
  @ApiProperty({ description: 'New non-empty value for the profile', example: 'https://x.com/yourhandle' })
  @IsString()
  @IsNotEmpty()
  value: string;
}


