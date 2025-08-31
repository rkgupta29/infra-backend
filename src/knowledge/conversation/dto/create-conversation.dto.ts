import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty({
    description: 'Name of the person in the conversation',
    example: 'Pratap Padode',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Title or designation of the person',
    example: 'Founder and President, First Construction Council',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description or topic of the conversation',
    example: 'Infra projects in India are invariably only 90 percent complete',
  })
  @IsString()
  @IsNotEmpty()
  desc: string;

  @ApiProperty({
    description: 'YouTube video link for the conversation',
    example: 'https://www.youtube.com/watch?v=w6oJTRqeB4A',
  })
  @IsString()
  @IsNotEmpty()
  videoLink: string;

  @ApiProperty({
    description: 'Date of the conversation',
    example: 'June 10, 2025',
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Whether the conversation is active',
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
