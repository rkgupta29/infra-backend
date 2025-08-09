import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class DeleteConfirmationDto {
  @ApiProperty({
    description: 'SuperAdmin password to confirm deletion. This prevents unauthorized admin deletions.',
    example: 'SuperAdmin@123',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  superAdminPassword: string;
}
