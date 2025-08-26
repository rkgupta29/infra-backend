import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray, IsUrl, IsDateString, ArrayMinSize } from 'class-validator';

export class CreateVideoDto {
  @ApiProperty({
    description: 'Image URL or path for the video thumbnail',
    example: '/assets/archive/video/example.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'Title of the video',
    example: 'HSR will be the next growth multiplier',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'Subtitle of the video',
    example: 'The Infravision Conversation',
  })
  @IsString()
  @IsOptional()
  subtitle?: string;

  @ApiProperty({
    description: 'Description of the video',
    example: 'A detailed discussion about high-speed rail infrastructure in India',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'URL to the video (YouTube embed link, etc.)',
    example: 'https://www.youtube.com/embed/Sr17ZN7FLA4',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: 'Link must be a valid URL' })
  link: string;

  @ApiProperty({
    description: 'Date when the video was published',
    example: '2023-08-27',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Array of category IDs that this video belongs to',
    example: ['60d21b4667d0d8992e610c85', '60d21b4667d0d8992e610c86'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1, { message: 'Video must belong to at least one category' })
  categoryIds: string[];

  @ApiPropertyOptional({
    description: 'Whether the video is active',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
