import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { DeleteConfirmationDto } from './dto/delete-confirmation.dto';
import { AdminResponseDto, DeleteAdminResponseDto } from './dto/admin-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Admin Management')
@ApiBearerAuth('JWT-auth')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @Roles(UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create new admin',
    description: 'Create a new admin user. Only SUPERADMIN can create new admins. The new admin will have ADMIN role by default.',
  })
  @ApiBody({
    type: CreateAdminDto,
    description: 'Admin creation data',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Admin created successfully',
    type: AdminResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { 
          type: 'array', 
          items: { type: 'string' },
          example: ['email must be an email', 'password must be at least 8 characters long']
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Only SUPERADMIN can create new admins',
  })
  @ApiConflictResponse({
    description: 'Admin with this email already exists',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'Admin with this email already exists' },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  })
  async create(
    @Body() createAdminDto: CreateAdminDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.adminService.create(createAdminDto, currentUser);
  }

  @Get()
  @Roles(UserRole.SUPERADMIN)
  @ApiOperation({
    summary: 'Get all admins',
    description: 'Retrieve a list of all admin users. Only SUPERADMIN can access this endpoint.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all admins retrieved successfully',
    type: [AdminResponseDto],
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Only SUPERADMIN can view all admins',
  })
  async findAll(@CurrentUser() currentUser: any) {
    return this.adminService.findAll(currentUser);
  }

  @Get('profile')
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get current user profile',
    description: 'Retrieve the profile information of the currently authenticated admin.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Current user profile retrieved successfully',
    type: AdminResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing JWT token',
  })
  async getProfile(@CurrentUser() currentUser: any) {
    return this.adminService.getProfile(currentUser);
  }

  @Get(':id')
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get admin by ID',
    description: 'Retrieve admin information by ID. SUPERADMIN can view any admin, ADMIN can only view their own profile.',
  })
  @ApiParam({
    name: 'id',
    description: 'Admin unique identifier',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Admin retrieved successfully',
    type: AdminResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'You can only view your own profile unless you are SUPERADMIN',
  })
  @ApiNotFoundResponse({
    description: 'Admin not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Admin not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async findOne(@Param('id') id: string, @CurrentUser() currentUser: any) {
    return this.adminService.findOne(id, currentUser);
  }



  @Delete(':id')
  @Roles(UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete admin',
    description: 'Delete an admin user with security confirmation. Only SUPERADMIN can delete admins. Cannot delete SUPERADMIN accounts or self.',
  })
  @ApiParam({
    name: 'id',
    description: 'Admin unique identifier',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiBody({
    type: DeleteConfirmationDto,
    description: 'SuperAdmin password confirmation to authorize deletion',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Admin deleted successfully',
    type: DeleteAdminResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid superadmin password',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Invalid superadmin password' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Only SUPERADMIN can delete admins / Cannot delete SUPERADMIN account / Cannot delete your own account',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { 
          type: 'string', 
          oneOf: [
            { example: 'Only superadmin can delete admins' },
            { example: 'Cannot delete superadmin account' },
            { example: 'Cannot delete your own account' }
          ]
        },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Admin not found',
  })
  async remove(
    @Param('id') id: string,
    @Body() deleteConfirmationDto: DeleteConfirmationDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.adminService.remove(id, deleteConfirmationDto, currentUser);
  }
}
