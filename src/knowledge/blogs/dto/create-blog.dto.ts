import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({
    description: 'The title of the blog',
    example: 'The Future of Sustainable Infrastructure',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The subtitle of the blog',
    example: 'Exploring innovative approaches to eco-friendly construction',
    required: false,
  })
  @IsString()
  @IsOptional()
  subtitle?: string;

  @ApiProperty({
    description: 'The name of the author',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  authorName: string;

  @ApiProperty({
    description: 'The designation/title of the author',
    example: 'Senior Researcher, Environmental Studies',
  })
  @IsString()
  @IsNotEmpty()
  authorDesignation: string;

  @ApiProperty({
    description: 'The publication date of the blog',
    example: '2023-05-15',
  })
  @IsDateString()
  @IsNotEmpty()
  publishedDate: string;

  @ApiProperty({
    description: 'The markdown content of the blog',
    example: '# Introduction\n\nThis is a blog post about sustainable infrastructure...',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Whether the blog is active',
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiProperty({
    description: 'Array of sector IDs associated with this blog',
    example: ['60d5ec9d8e8a8d2a5c8e8a8d', '60d5ec9d8e8a8d2a5c8e8a8e'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  sectorIds: string[];
}
