import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateOrganisationDto {
  @ApiPropertyOptional({ description: 'Address', example: '123 Main St, City, Country' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Emails', example: ['info@example.com', 'support@example.com'] })
  @IsOptional()
  @IsArray()
  emails?: string[];

  @ApiPropertyOptional({ description: 'Phones', example: ['+1 555 1234', '+1 555 5678'] })
  @IsOptional()
  @IsArray()
  phones?: string[];

  @ApiPropertyOptional({ description: 'Location map URL', example: 'https://maps.google.com/?q=...' })
  @IsOptional()
  @IsString()
  locationMapUrl?: string;

  @ApiPropertyOptional({ description: 'Company tagline', example: 'Building the future' })
  @IsOptional()
  @IsString()
  companyTagline?: string;

  @ApiPropertyOptional({ description: 'Company vision markdown (stringified)', example: '# Vision' })
  @IsOptional()
  @IsString()
  vision?: string;

  @ApiPropertyOptional({ description: 'Company mission markdown (stringified)', example: '# Mission' })
  @IsOptional()
  @IsString()
  mission?: string;
}


