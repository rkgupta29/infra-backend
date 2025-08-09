import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class AdminResponseDto {
  @ApiProperty({
    description: 'Admin unique identifier',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Admin full name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Admin email address',
    example: 'john@admin.com',
  })
  email: string;

  @ApiProperty({
    description: 'Admin role',
    enum: UserRole,
    example: UserRole.ADMIN,
  })
  role: UserRole;

  @ApiProperty({
    description: 'Account creation timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  updatedAt: Date;
}

export class DeleteAdminResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Admin deleted successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Information about the deleted admin',
    type: 'object',
    properties: {
      id: {
        type: 'string',
        example: '507f1f77bcf86cd799439011',
      },
      name: {
        type: 'string',
        example: 'John Doe',
      },
      email: {
        type: 'string',
        example: 'john@admin.com',
      },
    },
  })
  deletedAdmin: {
    id: string;
    name: string;
    email: string;
  };
}
