import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsInt, Min, IsBoolean } from 'class-validator';

export class CreateArchiveTabDto {
    @ApiProperty({
        description: 'Display name of the tab',
        example: 'Newsletters',
    })
    @IsNotEmpty({ message: 'Name is required' })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'URL-friendly identifier',
        example: 'newsletters',
    })
    @IsNotEmpty({ message: 'Slug is required' })
    @IsString()
    slug: string;

    @ApiPropertyOptional({
        description: 'Optional description of the tab content',
        example: 'Archive of all published newsletters',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: 'Order in which tabs should be displayed',
        example: 1,
    })
    @IsNotEmpty({ message: 'Order is required' })
    @IsInt()
    @Min(1)
    order: number;

    @ApiPropertyOptional({
        description: 'Whether the tab is active',
        example: true,
        default: true,
    })
    @IsOptional()
    @IsBoolean()
    active?: boolean = true;
}
