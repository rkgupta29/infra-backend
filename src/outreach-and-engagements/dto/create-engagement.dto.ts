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
        description: 'Title of the engagement/event',
        example: 'Annual Infrastructure Conference 2025'
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Location of the engagement/event',
        example: 'New Delhi, India'
    })
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiProperty({
        description: 'Description of the engagement/event',
        example: 'A comprehensive conference covering the latest in infrastructure development'
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Date of the engagement/event in UTC format',
        example: '2025-10-15T09:00:00.000Z'
    })
    @IsDateString()
    @IsNotEmpty()
    date: string;

    @ApiProperty({
        description: 'Type tag (e.g., "Conference", "Workshop")',
        example: 'Conference'
    })
    @IsNotEmpty()
    @IsString()
    tag: string;

    @ApiPropertyOptional({
        description: 'Optional subtitle or markdown content',
        example: '## Join us for the premier infrastructure event of the year'
    })
    @IsOptional()
    @IsString()
    subtitle?: string;

    @ApiPropertyOptional({
        description: 'Optional URL to a report PDF',
        example: 'https://example.com/reports/conference-2025.pdf'
    })
    @IsOptional()
    @IsString()
    reportUrl?: string;

    @ApiPropertyOptional({
        description: 'Optional array of cover objects containing url and description',
        type: [CoverDto]
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CoverDto)
    covers?: CoverDto[];

    @ApiPropertyOptional({
        description: 'Whether the engagement is active',
        example: true,
        default: true
    })
    @IsOptional()
    active?: boolean;
}
