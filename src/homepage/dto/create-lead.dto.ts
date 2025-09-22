import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLeadDto {
    @ApiProperty({
        description: 'First name of the person submitting the form',
        example: 'John',
    })
    @IsNotEmpty({ message: 'First name is required' })
    @IsString()
    firstName: string;

    @ApiProperty({
        description: 'Last name of the person submitting the form',
        example: 'Doe',
    })
    @IsNotEmpty({ message: 'Last name is required' })
    @IsString()
    lastName: string;

    @ApiProperty({
        description: 'Email address of the person submitting the form',
        example: 'john.doe@example.com',
    })
    @IsNotEmpty({ message: 'Email address is required' })
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @ApiProperty({
        description: 'Contact number of the person submitting the form',
        example: '+91 98765 43210',
    })
    @IsNotEmpty({ message: 'Contact number is required' })
    @IsString()
    contactNumber: string;

    @ApiProperty({
        description: 'Type of person submitting the form',
        example: 'Student',
    })
    @IsNotEmpty({ message: 'Person type is required' })
    @IsString()
    personType: string;

    @ApiProperty({
        description: 'What the person is interested in',
        example: 'Research Collaboration',
    })
    @IsNotEmpty({ message: 'Interest is required' })
    @IsString()
    interestedIn: string;

    @ApiPropertyOptional({
        description: 'Message from the person submitting the form',
        example: 'I would like to inquire about your upcoming projects.',
    })
    @IsOptional()
    @IsString()
    message?: string;

    // fileUrl will be set automatically by the service after file upload

    @ApiPropertyOptional({
        description: 'Links provided by the person submitting the form',
        example: 'https://example.com/myproject',
    })
    @IsOptional()
    @IsString()
    links?: string;
}
