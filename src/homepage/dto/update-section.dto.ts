import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateSectionDto {
  @ApiProperty({
    description: 'The complete data object for the section. Can be any valid JSON object structure.',
    example: {
      title: 'Section Title',
      subtitle: 'Section Subtitle',
      description: 'Section description text',
      items: [
        { title: 'Item 1', description: 'Description 1' },
        { title: 'Item 2', description: 'Description 2' }
      ],
      cta: { text: 'Learn More', target: '/learn' }
    }
  })
  @IsObject({ message: 'Data must be a valid object' })
  data: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Whether the section is active and should be displayed',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class UpdateSectionFieldsDto {
  @ApiProperty({
    description: 'Specific fields to update in the section. Only the provided fields will be updated.',
    example: {
      title: 'Updated Title',
      subtitle: 'Updated Subtitle'
    }
  })
  @IsObject({ message: 'Fields must be a valid object' })
  fields: Record<string, any>;
}
