import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsInt, Min, IsBoolean } from 'class-validator';

export class CreateMediaCoverageDto {
    @ApiProperty({
        description: 'Category of the media coverage',
        example: 'News',
    })
    @IsNotEmpty({ message: 'Category is required' })
    @IsString()
    category: string;

    @ApiPropertyOptional({
        description: 'Title of the media coverage',
        example: 'Infrastructure Development in Rural Areas',
    })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({
        description: 'Date of publication in yyyy/mm/dd format',
        example: '2023/07/15',
    })
    @IsNotEmpty({ message: 'Date is required' })
    @IsString()
    date: string;

    @ApiProperty({
        description: 'Description of the media coverage',
        example: 'A comprehensive analysis of recent initiatives',
    })
    @IsNotEmpty({ message: 'Description is required' })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Link to the media coverage',
        example: 'https://example.com/article',
    })
    @IsNotEmpty({ message: 'Link is required' })
    @IsString()
    link: string;

    // image will be set automatically by the service after file upload

    @ApiPropertyOptional({
        description: 'Whether the media coverage is active',
        example: true,
        default: true,
    })
    @IsOptional()
    @IsBoolean()
    active?: boolean = true;
}