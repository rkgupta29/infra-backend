import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min, IsBoolean } from 'class-validator';

export class UpdateArchiveTabDto {
    @ApiPropertyOptional({
        description: 'Display name of the tab',
        example: 'Newsletters',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({
        description: 'URL-friendly identifier',
        example: 'newsletters',
    })
    @IsOptional()
    @IsString()
    slug?: string;

    @ApiPropertyOptional({
        description: 'Optional description of the tab content',
        example: 'Archive of all published newsletters',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        description: 'Order in which tabs should be displayed',
        example: 1,
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    order?: number;

    @ApiPropertyOptional({
        description: 'Whether the tab is active',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
