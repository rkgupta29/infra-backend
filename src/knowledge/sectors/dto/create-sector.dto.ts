import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSectorDto {
  @ApiProperty({
    description: 'The name of the sector',
    example: 'Infrastructure',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The URL-friendly slug for the sector',
    example: 'infrastructure',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    description: 'Optional description of the sector',
    example: 'Infrastructure sector includes transportation, energy, and urban development',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Whether the sector is active',
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
