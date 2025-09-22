import { ApiProperty } from '@nestjs/swagger';
import { EngagementDetailsDto } from './engagement-details.dto';

export class EventResponseDto {
    @ApiProperty({
        description: 'Unique identifier for the engagement',
        example: '64f5a1b8c123456789abcdef',
    })
    id: string;

    @ApiProperty({
        description: 'Date of the event in YYYY-MM-DD format',
        example: '2025-09-19',
    })
    date: string;

    @ApiProperty({
        description: 'Day and time of the engagement',
        example: 'Monday, 10:00 AM - 12:00 PM',
    })
    dayTime: string;

    @ApiProperty({
        description: 'Type of meeting',
        example: 'Webinar | Workshop | Event | Meeting',
    })
    meetingType: string;

    @ApiProperty({
        description: 'Short summary of the event',
        example: 'Short summary of the event',
    })
    desc: string;

    @ApiProperty({
        description: 'Call to action text for the main button',
        example: 'Register Now',
    })
    ctaText: string;

    @ApiProperty({
        description: 'Detailed information including images, date, content, and CTA',
        type: EngagementDetailsDto,
    })
    details: EngagementDetailsDto;

    @ApiProperty({
        description: 'Whether the engagement is active',
        example: true,
    })
    active: boolean;

    @ApiProperty({
        description: 'Creation timestamp',
        example: '2025-01-15T10:00:00Z',
    })
    createdAt: string;

    @ApiProperty({
        description: 'Last update timestamp',
        example: '2025-01-15T10:00:00Z',
    })
    updatedAt: string;
}

export class PaginatedEventsResponseDto {
    @ApiProperty({
        description: 'Array of events',
        type: [EventResponseDto],
    })
    data: EventResponseDto[];

    @ApiProperty({
        description: 'Pagination metadata',
        type: 'object',
        properties: {
            total: { type: 'number', example: 100 },
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            totalPages: { type: 'number', example: 10 },
            hasNext: { type: 'boolean', example: true },
            hasPrevious: { type: 'boolean', example: false },
        },
    })
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };

    @ApiProperty({
        description: 'Last update timestamp',
        example: '2025-01-15T10:00:00Z',
    })
    lastUpdated: string;
}
