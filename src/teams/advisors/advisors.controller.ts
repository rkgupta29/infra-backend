import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UploadedFiles,
  Patch,
  UseGuards,
  ParseBoolPipe
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import { AdvisorsService } from './advistors.service';
import { CreateAdvisorDto } from './dto/create-advisor.dto';
import { UpdateAdvisorDto } from './dto/update-advisor.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('Teams')
@Controller('teams/advisors')
export class AdvisorsController {
  constructor(private readonly service: AdvisorsService) { }

  /**
   * Get all advisors
   * This endpoint returns advisors data
   */
  @Get()
  @ApiOperation({
    summary: 'Get all advisors',
    description: 'Retrieves advisors data. This endpoint is public and does not require authentication.'
  })
  @ApiResponse({
    status: 200,
    description: 'Advisors data retrieved successfully',
  })
  async getAdvisors() {
    return this.service.getAdvisors();
  }

  /**
   * Get all advisors with pagination (admin)
   */
  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all advisors with pagination (admin)',
    description: 'Admin endpoint to retrieve all advisors with pagination'
  })
  @ApiResponse({
    status: 200,
    description: 'Advisors retrieved successfully',
  })
  async getAllAdvisors(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('activeOnly', ParseBoolPipe) activeOnly?: boolean,
  ) {
    return this.service.findAll(
      page ? +page : 1,
      limit ? +limit : 10,
      activeOnly || false
    );
  }

  /**
   * Get advisor by ID
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get advisor by ID',
    description: 'Retrieve a specific advisor by ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Advisor retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Advisor not found',
  })
  async getAdvisorById(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /**
   * Create a new advisor
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Create a new advisor',
    description: 'Create a new advisor with image upload'
  })
  @ApiBody({
    description: 'Advisor data with image upload',
    type: CreateAdvisorDto,
  })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'popupImage', maxCount: 1 },
  ]))
  async create(
    @Body() createAdvisorDto: CreateAdvisorDto,
    @UploadedFiles() files: { image?: Array<Multer.File>, popupImage?: Array<Multer.File> }
  ) {
    return this.service.create(
      createAdvisorDto,
      files.image?.[0],
      files.popupImage?.[0]
    );
  }

  /**
   * Update an advisor
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Update an advisor',
    description: 'Update an existing advisor with optional image upload'
  })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'popupImage', maxCount: 1 },
  ]))
  async update(
    @Param('id') id: string,
    @Body() updateAdvisorDto: UpdateAdvisorDto,
    @UploadedFiles() files: { image?: Array<Multer.File>, popupImage?: Array<Multer.File> }
  ) {
    return this.service.update(
      id,
      updateAdvisorDto,
      files.image?.[0],
      files.popupImage?.[0]
    );
  }

  /**
   * Toggle advisor active status
   */
  @Patch(':id/toggle-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Toggle advisor active status',
    description: 'Toggle the active status of an advisor'
  })
  async toggleStatus(@Param('id') id: string) {
    return this.service.toggleStatus(id);
  }

  /**
   * Delete an advisor
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete an advisor',
    description: 'Delete an advisor and associated files'
  })
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}