import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { EngagementDetailsDto } from './engagement-details.dto';

export class CreateEngagementDto {
    @ApiProperty({
        description: 'Date of the event in YYYY-MM-DD format',
        example: '2025-09-19',
    })
    @IsNotEmpty()
    @IsString()
    date: string;

    @ApiProperty({
        description: 'Day and time of the engagement',
        example: 'Monday, 10:00 AM - 12:00 PM',
    })
    @IsNotEmpty()
    @IsString()
    dayTime: string;

    @ApiProperty({
        description: 'Type of meeting',
        example: 'Webinar | Workshop | Event | Meeting',
    })
    @IsNotEmpty()
    @IsString()
    meetingType: string;

    @ApiProperty({
        description: 'Short summary of the event',
        example: 'Short summary of the event',
    })
    @IsNotEmpty()
    @IsString()
    desc: string;

    @ApiProperty({
        description: 'Call to action text for the main button',
        example: 'Register Now',
    })
    @IsNotEmpty()
    @IsString()
    ctaText: string;

    @ApiProperty({
        description: 'Detailed information including images, date, content, and CTA',
        type: EngagementDetailsDto,
    })
    @ValidateNested()
    @Type(() => EngagementDetailsDto)
    details: EngagementDetailsDto;

    @ApiPropertyOptional({
        description: 'Whether the engagement is active',
        example: true,
        default: true,
    })
    @IsOptional()
    active?: boolean;
}