import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class EngagementCtaDto {
    @ApiProperty({
        description: 'Text for the call to action button',
        example: 'Join Now',
    })
    @IsNotEmpty()
    @IsString()
    ctaText: string;

    @ApiProperty({
        description: 'Link for the call to action button',
        example: 'https://example.com',
    })
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    link: string;
}
