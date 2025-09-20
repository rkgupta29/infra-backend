import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { EngagementImageDto } from './engagement-image.dto';
import { EngagementCtaDto } from './engagement-cta.dto';

export class EngagementDetailsDto {
    @ApiProperty({
        description: 'Array of images with descriptions',
        type: [EngagementImageDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EngagementImageDto)
    images: EngagementImageDto[];

    @ApiProperty({
        description: 'Full details about the event (long description, agenda, etc.)',
        example: 'Full details about the event (long description, agenda, etc.)',
    })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({
        description: 'Call to action information',
        type: EngagementCtaDto,
    })
    @ValidateNested()
    @Type(() => EngagementCtaDto)
    cta: EngagementCtaDto;
}
