import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class CreateAdvisorDto {
    @ApiProperty({ description: 'Advisor name' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'Advisor designation' })
    @IsString()
    @IsNotEmpty()
    desig: string;

    @ApiProperty({ description: 'Advisor description', required: false })
    @IsString()
    @IsNotEmpty()
    popupdesc: string;

    @ApiProperty({ description: 'Social media profile link', required: false })
    @IsString()
    @IsOptional()
    @IsUrl()
    link?: string;

    @ApiProperty({ description: 'Social media platform', required: false })
    @IsString()
    @IsOptional()
    socialMedia?: string;

    @ApiProperty({ description: 'Whether the advisor is active', default: true })
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
