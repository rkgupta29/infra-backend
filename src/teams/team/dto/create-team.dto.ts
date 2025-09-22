import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber, Min } from 'class-validator';

export class CreateTeamDto {
    @ApiPropertyOptional({ description: 'URL to the team member\'s image (optional, can be uploaded via file)' })
    @IsOptional()
    @IsString()
    image?: string;

    @ApiProperty({ description: 'Name of the team member' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: 'Designation of the team member' })
    @IsNotEmpty()
    @IsString()
    desig: string;

    @ApiPropertyOptional({ description: 'Optional popup image URL' })
    @IsOptional()
    @IsString()
    popupImg?: string;

    @ApiProperty({ description: 'Description for the popup' })
    @IsNotEmpty()
    @IsString()
    popupdesc: string;

    @ApiPropertyOptional({ description: 'Optional social media or website link' })
    @IsOptional()
    @IsString()
    link?: string;

    @ApiPropertyOptional({ description: 'Optional social media platform name' })
    @IsOptional()
    @IsString()
    socialMedia?: string;

    @ApiPropertyOptional({ description: 'Order for sorting team members', default: 0 })
    @IsOptional()
    @IsNumber()
    @Min(0)
    order?: number;

    @ApiPropertyOptional({ description: 'Whether the team member is active', default: true })
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
