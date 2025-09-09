import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber, Min } from 'class-validator';

export class UpdatePatronDto {
    @ApiPropertyOptional({ description: 'URL to the patron\'s image' })
    @IsOptional()
    @IsString()
    image?: string;

    @ApiPropertyOptional({ description: 'Name of the patron' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ description: 'Designation of the patron' })
    @IsOptional()
    @IsString()
    desig?: string;

    @ApiPropertyOptional({ description: 'Optional popup image URL' })
    @IsOptional()
    @IsString()
    popupImg?: string;

    @ApiPropertyOptional({ description: 'Description for the popup' })
    @IsOptional()
    @IsString()
    popupdesc?: string;

    @ApiPropertyOptional({ description: 'Optional social media or website link' })
    @IsOptional()
    @IsString()
    link?: string;

    @ApiPropertyOptional({ description: 'Optional social media platform name' })
    @IsOptional()
    @IsString()
    socialMedia?: string;

    @ApiPropertyOptional({ description: 'Order for sorting patrons' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    order?: number;

    @ApiPropertyOptional({ description: 'Whether the patron is active' })
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}

