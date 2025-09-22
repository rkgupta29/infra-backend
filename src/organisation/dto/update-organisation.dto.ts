import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOrganisationDto {
  @ApiPropertyOptional({ description: 'Address', example: '123 Main St, City, Country' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Email', example: 'info@example.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ description: 'Phone', example: '+1 555 1234' })
  @IsOptional()
  @IsString()
  phone?: string;

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
