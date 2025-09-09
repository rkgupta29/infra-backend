import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class CreateFellowDto {
    @ApiProperty({ description: 'Fellow name' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'Fellow designation' })
    @IsString()
    @IsNotEmpty()
    desig: string;

    @ApiProperty({ description: 'Fellow subtitle (e.g., "Distinguished Fellow (Power)")' })
    @IsString()
    @IsNotEmpty()
    subtitle: string;

    @ApiProperty({ description: 'Fellow description', required: false })
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

    @ApiProperty({ description: 'Whether the fellow is active', default: true })
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
