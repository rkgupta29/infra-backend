import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EngagementImageDto {
    @ApiProperty({
        description: 'URL to the image',
        example: 'url-to-image.jpg',
    })
    @IsNotEmpty()
    @IsString()
    image: string;

    @ApiProperty({
        description: 'Description or alt text for the image',
        example: 'Image description or alt text',
    })
    @IsNotEmpty()
    @IsString()
    description: string;
}
