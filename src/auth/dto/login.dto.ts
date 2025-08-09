import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Admin email address',
    example: 'superadmin@admin.com',
    format: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Admin password',
    example: 'SuperAdmin@123',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
