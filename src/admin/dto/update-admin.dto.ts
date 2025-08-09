import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAdminDto {
  @ApiPropertyOptional({
    description: 'Updated full name of the admin',
    example: 'John Doe Updated',
    minLength: 1,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Updated email address for the admin',
    example: 'john.updated@admin.com',
    format: 'email',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Updated password for the admin account',
    example: 'NewSecurePassword123',
    minLength: 8,
  })
  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password?: string;
}
