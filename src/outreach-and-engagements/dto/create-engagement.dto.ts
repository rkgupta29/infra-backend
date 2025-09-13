import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CoverDto {
    @ApiProperty({ description: 'URL of the cover image or document' })
    @IsNotEmpty()
    @IsString()
    url: string;

    @ApiProperty({ description: 'Description of the cover' })
    @IsNotEmpty()
    @IsString()
    desc: string;
}

export class CreateEngagementDto {
    @ApiProperty({
        description: 'Title of the engagement',
        example: 'Annual Infrastructure Conference 2025'
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Tag for the engagement',
        example: 'Conference'
    })
    @IsNotEmpty()
    @IsString()
    tag: string;

    @ApiProperty({
        description: 'Date of the engagement in UTC format',
        example: '2025-10-15T09:00:00.000Z'
    })
    @IsDateString()
    @IsNotEmpty()
    date: string;

    @ApiPropertyOptional({
        description: 'Subtitle of the engagement in markdown format',
        example: '## Join us for the premier infrastructure event of the year'
    })
    @IsOptional()
    @IsString()
    subtitle?: string;

    @ApiPropertyOptional({
        description: 'URL to the report or additional information',
        example: 'https://example.com/reports/conference-2025.pdf'
    })
    @IsOptional()
    @IsString()
    reportUrl?: string;

    @ApiProperty({
        description: 'Array of cover objects containing url and description',
        type: [CoverDto]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CoverDto)
    covers: CoverDto[];
}
