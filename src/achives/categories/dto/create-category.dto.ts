import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, Matches } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name of the category',
    example: 'Transportation',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'URL-friendly slug for the category',
    example: 'transportation',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must be URL-friendly: lowercase letters, numbers, and hyphens only',
  })
  slug: string;

  @ApiPropertyOptional({
    description: 'Description of the category',
    example: 'Videos related to transportation infrastructure',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Whether the category is active',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
