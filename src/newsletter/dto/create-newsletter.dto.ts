import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNewsletterDto {
    @ApiProperty({
        description: 'Title of the newsletter',
        example: 'Infrastructure Insights',
    })
    @IsNotEmpty({ message: 'Title is required' })
    @IsString()
    title: string;

    @ApiPropertyOptional({
        description: 'Subtitle of the newsletter',
        example: 'Quarterly Review of Infrastructure Development',
    })
    @IsOptional()
    @IsString()
    subtitle?: string;

    @ApiProperty({
        description: 'Version of the newsletter (e.g., Vol. 1, Issue 2)',
        example: 'Vol. 1, Issue 2',
    })
    @IsNotEmpty({ message: 'Version is required' })
    @IsString()
    version: string;

    @ApiProperty({
        description: 'Published date of the newsletter',
        example: '2023-06-15T00:00:00.000Z',
    })
    @IsNotEmpty({ message: 'Published date is required' })
    @IsDateString()
    publishedDate: string;

    @ApiProperty({
        description: 'URL to the cover image',
        example: '/assets/images/newsletter-cover-june-2023.jpg',
    })
    @IsNotEmpty({ message: 'Cover image URL is required' })
    @IsString()
    coverImage: string;

    @ApiProperty({
        description: 'URL to the PDF file',
        example: '/assets/pdf/newsletter-june-2023.pdf',
    })
    @IsNotEmpty({ message: 'File URL is required' })
    @IsString()
    fileUrl: string;

    @ApiPropertyOptional({
        description: 'Whether the newsletter is active',
        example: true,
        default: true,
    })
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
