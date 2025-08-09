import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Admin login',
    description: 'Authenticate admin user with email and password. Returns JWT token for subsequent API calls.',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Admin login credentials',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successful. Returns JWT token and admin information.',
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data (malformed email, missing fields, etc.)',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { 
          type: 'array', 
          items: { type: 'string' },
          example: ['email must be an email', 'password should not be empty']
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials provided',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Invalid credentials' },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
