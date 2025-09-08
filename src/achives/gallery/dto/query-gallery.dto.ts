import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}

export class QueryGalleryDto {
    @ApiPropertyOptional({
        description: 'Page number (1-based)',
        default: 1,
        minimum: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({
        description: 'Number of items per page',
        default: 10,
        minimum: 1,
        maximum: 100,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    @ApiPropertyOptional({
        description: 'Sort by field',
        default: 'year',
    })
    @IsOptional()
    @IsString()
    sortBy?: string = 'year';

    @ApiPropertyOptional({
        description: 'Sort order',
        default: SortOrder.DESC,
        enum: SortOrder,
    })
    @IsOptional()
    @IsEnum(SortOrder)
    sortOrder?: SortOrder = SortOrder.DESC;

    @ApiPropertyOptional({
        description: 'Filter by year',
        example: 2023,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    year?: number;

    @ApiPropertyOptional({
        description: 'Filter by event name (partial match)',
        example: 'Conference',
    })
    @IsOptional()
    @IsString()
    event?: string;

    @ApiPropertyOptional({
        description: 'Filter by tab ID',
        example: '60d21b4667d0d8992e610c85',
    })
    @IsOptional()
    @IsString()
    tabId?: string;

    @ApiPropertyOptional({
        description: 'Filter by tab slug',
        example: 'events',
    })
    @IsOptional()
    @IsString()
    tabSlug?: string;
}
