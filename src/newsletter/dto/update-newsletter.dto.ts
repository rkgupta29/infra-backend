import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateNewsletterDto {
    @ApiPropertyOptional({
        description: 'Title of the newsletter',
        example: 'Infrastructure Insights',
    })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({
        description: 'Subtitle of the newsletter',
        example: 'Quarterly Review of Infrastructure Development',
    })
    @IsOptional()
    @IsString()
    subtitle?: string;

    @ApiPropertyOptional({
        description: 'Version of the newsletter (e.g., Vol. 1, Issue 2)',
        example: 'Vol. 1, Issue 2',
    })
    @IsOptional()
    @IsString()
    version?: string;

    @ApiPropertyOptional({
        description: 'Published date of the newsletter',
        example: '2023-06-15T00:00:00.000Z',
    })
    @IsOptional()
    @IsDateString()
    publishedDate?: string;

    @ApiPropertyOptional({
        description: 'URL to the cover image',
        example: '/assets/images/newsletter-cover-june-2023.jpg',
    })
    @IsOptional()
    @IsString()
    coverImage?: string;

    @ApiPropertyOptional({
        description: 'URL to the PDF file',
        example: '/assets/pdf/newsletter-june-2023.pdf',
    })
    @IsOptional()
    @IsString()
    fileUrl?: string;

    @ApiPropertyOptional({
        description: 'Whether the newsletter is active',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
