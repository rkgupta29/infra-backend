import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateSocialProfileDto {
  @ApiProperty({ description: 'Unique slug key without spaces', example: 'twitter' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S+$/, { message: 'slug must not contain spaces' })
  slug: string;

  @ApiProperty({ description: 'Non-empty value for the profile', example: 'https://twitter.com/yourhandle' })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({ description: 'Active flag', example: true, required: false, default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean = true;
}


