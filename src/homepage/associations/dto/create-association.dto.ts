import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber, Min } from 'class-validator';

export class CreateAssociationDto {
    @ApiProperty({ description: 'Name of the association' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiPropertyOptional({ description: 'Order for sorting associations', default: 0 })
    @IsOptional()
    @IsNumber()
    @Min(0)
    order?: number;

    @ApiPropertyOptional({ description: 'Whether the association is active', default: true })
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
