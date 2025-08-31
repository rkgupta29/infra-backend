import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateResearchPaperDto {
  @ApiProperty({
    description: 'The title of the research paper',
    example: 'Study on the implementation of compensatory afforestation in India',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the research paper',
    example: 'This paper examines the implementation of compensatory afforestation policies in India',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The publication date of the research paper',
    example: '2023-01-15',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Whether the research paper is active',
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiProperty({
    description: 'Array of sector IDs associated with this research paper',
    example: ['60d5ec9d8e8a8d2a5c8e8a8d', '60d5ec9d8e8a8d2a5c8e8a8e'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  sectorIds: string[];
}