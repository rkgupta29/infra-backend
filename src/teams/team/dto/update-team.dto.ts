import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber, Min } from 'class-validator';

export class UpdateTeamDto {
    @ApiPropertyOptional({ description: 'URL to the team member\'s image' })
    @IsOptional()
    @IsString()
    image?: string;

    @ApiPropertyOptional({ description: 'Name of the team member' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ description: 'Designation of the team member' })
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

    @ApiPropertyOptional({ description: 'Order for sorting team members' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    order?: number;

    @ApiPropertyOptional({ description: 'Whether the team member is active' })
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
