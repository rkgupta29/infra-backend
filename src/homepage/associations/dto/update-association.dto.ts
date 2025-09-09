import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber, Min } from 'class-validator';

export class UpdateAssociationDto {
    @ApiPropertyOptional({ description: 'Name of the association' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ description: 'URL to the association\'s logo/image' })
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @ApiPropertyOptional({ description: 'Order for sorting associations' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    order?: number;

    @ApiPropertyOptional({ description: 'Whether the association is active' })
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
