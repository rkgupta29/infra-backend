import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsInt, Min, IsBoolean } from 'class-validator';

export class CreateMediaCoverageDto {
    @ApiProperty({
        description: 'Title of the media coverage',
        example: 'Infrastructure Development in Rural Areas',
    })
    @IsNotEmpty({ message: 'Title is required' })
    @IsString()
    title: string;

    @ApiPropertyOptional({
        description: 'Subtitle of the media coverage',
        example: 'A comprehensive analysis of recent initiatives',
    })
    @IsOptional()
    @IsString()
    subtitle?: string;

    @ApiProperty({
        description: 'Name of the author or publication',
        example: 'The Economic Times',
    })
    @IsNotEmpty({ message: 'Author name is required' })
    @IsString()
    authorName: string;

    @ApiProperty({
        description: 'Date of publication',
        example: 'July 15, 2023',
    })
    @IsNotEmpty({ message: 'Date is required' })
    @IsString()
    date: string;

    @ApiProperty({
        description: 'URL to the cover image (will be set automatically after upload)',
        example: '/assets/images/media-coverage/infrastructure-development.jpg',
    })
    @IsString()
    coverImage: string;

    @ApiProperty({
        description: 'Year of publication for filtering',
        example: 2023,
    })
    @IsNotEmpty({ message: 'Publication year is required' })
    @IsInt()
    @Min(1900)
    publicationYear: number;

    @ApiPropertyOptional({
        description: 'Whether the media coverage is active',
        example: true,
        default: true,
    })
    @IsOptional()
    @IsBoolean()
    active?: boolean = true;
}
