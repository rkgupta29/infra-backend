import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsBoolean, IsOptional } from 'class-validator';

export class UpdateGalleryItemDto {
    @ApiPropertyOptional({
        description: 'URL to the image file',
        example: '/assets/images/gallery/event-2023-01.jpg',
    })
    @IsOptional()
    @IsString()
    image?: string;

    @ApiPropertyOptional({
        description: 'Name of the event',
        example: 'Annual Conference 2023',
    })
    @IsOptional()
    @IsString()
    event?: string;

    @ApiPropertyOptional({
        description: 'Year of the event',
        example: 2023,
    })
    @IsOptional()
    @IsInt()
    @Min(1900)
    year?: number;

    @ApiPropertyOptional({
        description: 'Description of the image',
        example: 'Keynote speech by the CEO at the annual conference',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        description: 'ID of the archive tab this gallery item belongs to',
        example: '60d21b4667d0d8992e610c85',
    })
    @IsOptional()
    @IsString()
    tabId?: string;

    @ApiPropertyOptional({
        description: 'Whether the gallery item is active',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
