import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl, IsOptional, IsBoolean } from 'class-validator';

export class CreateLatestUpdateDto {
  @ApiProperty({
    description: 'Image URL or path',
    example: 'img_12',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'Category of the update',
    example: 'Event',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Title of the update',
    example: 'HSR will be the next growth multiplier',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Button title',
    example: 'See details',
  })
  @IsString()
  @IsNotEmpty()
  btnTitle: string;

  @ApiProperty({
    description: 'Link to navigate to when button is clicked',
    example: '/outreach-and-engagements',
  })
  @IsString()
  @IsNotEmpty()
  link: string;

  @ApiProperty({
    description: 'Whether the update is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
