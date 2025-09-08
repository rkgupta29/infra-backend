import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}

export class QueryLeadsDto {
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
        default: 'createdAt',
    })
    @IsOptional()
    @IsString()
    sortBy?: string = 'createdAt';

    @ApiPropertyOptional({
        description: 'Sort order',
        default: SortOrder.DESC,
        enum: SortOrder,
    })
    @IsOptional()
    @IsEnum(SortOrder)
    sortOrder?: SortOrder = SortOrder.DESC;

    @ApiPropertyOptional({
        description: 'Search term to filter by name or email',
        example: 'john',
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        description: 'Filter by person type',
        example: 'Student',
    })
    @IsOptional()
    @IsString()
    personType?: string;

    @ApiPropertyOptional({
        description: 'Filter by interest',
        example: 'Research Collaboration',
    })
    @IsOptional()
    @IsString()
    interestedIn?: string;

    @ApiPropertyOptional({
        description: 'Filter by read status',
        example: 'true',
    })
    @IsOptional()
    isRead?: boolean;
}
