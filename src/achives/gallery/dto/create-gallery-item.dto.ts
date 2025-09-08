import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min, IsBoolean, IsOptional } from 'class-validator';

export class CreateGalleryItemDto {
    @ApiProperty({
        description: 'URL to the image file (will be set automatically after upload)',
        example: '/assets/images/gallery/event-2023-01.jpg',
    })
    @IsString()
    image: string;

    @ApiProperty({
        description: 'Name of the event',
        example: 'Annual Conference 2023',
    })
    @IsNotEmpty({ message: 'Event name is required' })
    @IsString()
    event: string;

    @ApiProperty({
        description: 'Year of the event',
        example: 2023,
    })
    @IsNotEmpty({ message: 'Year is required' })
    @IsInt()
    @Min(1900)
    year: number;

    @ApiProperty({
        description: 'Description of the image',
        example: 'Keynote speech by the CEO at the annual conference',
    })
    @IsNotEmpty({ message: 'Description is required' })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'ID of the archive tab this gallery item belongs to',
        example: '60d21b4667d0d8992e610c85',
    })
    @IsNotEmpty({ message: 'Tab ID is required' })
    @IsString()
    tabId: string;

    @ApiPropertyOptional({
        description: 'Whether the gallery item is active',
        example: true,
        default: true,
    })
    @IsOptional()
    @IsBoolean()
    active?: boolean = true;
}
