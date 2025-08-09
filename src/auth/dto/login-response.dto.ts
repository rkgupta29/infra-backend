import { ApiProperty } from '@nestjs/swagger';
import { AdminResponseDto } from '../../admin/dto/admin-response.dto';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token for authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'Admin information',
    type: AdminResponseDto,
  })
  admin: AdminResponseDto;
}
