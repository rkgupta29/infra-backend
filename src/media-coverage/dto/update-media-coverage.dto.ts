import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsBoolean, IsOptional } from 'class-validator';

export class UpdateMediaCoverageDto {
    @ApiPropertyOptional({
        description: 'Title of the media coverage',
        example: 'Infrastructure Development in Rural Areas',
    })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({
        description: 'Subtitle of the media coverage',
        example: 'A comprehensive analysis of recent initiatives',
    })
    @IsOptional()
    @IsString()
    subtitle?: string;

    @ApiPropertyOptional({
        description: 'Name of the author or publication',
        example: 'The Economic Times',
    })
    @IsOptional()
    @IsString()
    authorName?: string;

    @ApiPropertyOptional({
        description: 'Date of publication',
        example: 'July 15, 2023',
    })
    @IsOptional()
    @IsString()
    date?: string;

    @ApiPropertyOptional({
        description: 'URL to the cover image',
        example: '/assets/images/media-coverage/infrastructure-development.jpg',
    })
    @IsOptional()
    @IsString()
    coverImage?: string;

    @ApiPropertyOptional({
        description: 'Year of publication for filtering',
        example: 2023,
    })
    @IsOptional()
    @IsInt()
    @Min(1900)
    publicationYear?: number;

    @ApiPropertyOptional({
        description: 'Whether the media coverage is active',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
