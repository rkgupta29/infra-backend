import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber, Min } from 'class-validator';

export class UpdateTrusteeDto {
    @ApiPropertyOptional({ description: 'URL to the trustee\'s image' })
    @IsOptional()
    @IsString()
    image?: string;

    @ApiPropertyOptional({ description: 'Name of the trustee' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ description: 'Designation of the trustee' })
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

    @ApiPropertyOptional({ description: 'Order for sorting trustees' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    order?: number;

    @ApiPropertyOptional({ description: 'Whether the trustee is active' })
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
