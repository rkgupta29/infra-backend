import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateResearchPaperDto {
  @ApiProperty({
    description: 'The image URL for the research paper',
    example: '/assets/knowledge/researchPapers/01.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'The title of the research paper',
    example: 'Study on the implementation of compensatory afforestation in India',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'The description of the research paper',
    example: 'This paper examines the implementation of compensatory afforestation policies in India',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The link to the research paper PDF',
    example: '/assets/pdf/Study-on-Implementation-of-Compensatory-Afforestation-in-India.pdf',
    required: false,
  })
  @IsString()
  @IsOptional()
  link?: string;

  @ApiProperty({
    description: 'The publication date of the research paper',
    example: '2023-01-15',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiProperty({
    description: 'Whether the research paper is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiProperty({
    description: 'Array of sector IDs associated with this research paper',
    example: ['60d5ec9d8e8a8d2a5c8e8a8d', '60d5ec9d8e8a8d2a5c8e8a8e'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  sectorIds?: string[];
}
