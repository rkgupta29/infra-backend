import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, IsBoolean, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class TrusteeQueryDto {
    @ApiPropertyOptional({ description: 'Page number (starts from 1)', default: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ description: 'Number of items per page', default: 10 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;

    @ApiPropertyOptional({ description: 'Filter by active status' })
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    @IsBoolean()
    active?: boolean;

    @ApiPropertyOptional({ description: 'Search by title (name)' })
    @IsOptional()
    @IsString()
    search?: string;
}
