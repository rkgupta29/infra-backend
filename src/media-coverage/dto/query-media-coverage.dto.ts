import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}

export class QueryMediaCoverageDto {
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
        maximum: 50,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    limit?: number = 10;

    @ApiPropertyOptional({
        description: 'Sort by field (title, date, createdAt, updatedAt)',
        default: 'date',
        example: 'date',
    })
    @IsOptional()
    @IsString()
    sortBy?: string = 'date';

    @ApiPropertyOptional({
        description: 'Sort order',
        default: SortOrder.DESC,
        enum: SortOrder,
    })
    @IsOptional()
    @IsEnum(SortOrder)
    sortOrder?: SortOrder = SortOrder.DESC;

    @ApiPropertyOptional({
        description: 'Search term to filter by title, subtitle, or author name',
        example: 'infrastructure',
    })
    @IsOptional()
    @IsString()
    search?: string;


    @ApiPropertyOptional({
        description: 'If true, returns only active media coverage items',
        default: true,
    })
    @IsOptional()
    @Type(() => Boolean)
    activeOnly?: boolean = true;
}
