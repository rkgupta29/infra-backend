import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { LatestUpdatesService } from './latest-updates.service';
import { CreateLatestUpdateDto } from './dto/create-latest-update.dto';
import { UpdateLatestUpdateDto } from './dto/update-latest-update.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Latest Updates Management')
@Controller('homepage/latest-updates')
export class LatestUpdatesController {
  constructor(private readonly latestUpdatesService: LatestUpdatesService) {}

  /**
   * Create a new latest update
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create a new latest update',
    description: 'Creates a new latest update entry. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiBody({
    type: CreateLatestUpdateDto,
    description: 'The data for the new latest update',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Latest update created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request - Invalid data format',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions',
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLatestUpdateDto: CreateLatestUpdateDto) {
    return this.latestUpdatesService.create(createLatestUpdateDto);
  }

  /**
   * Get all latest updates
   * This endpoint is public and returns all updates
   */
  @Get()
  @ApiOperation({
    summary: 'Get all latest updates',
    description: 'Retrieves all latest updates. This endpoint is public and does not require authentication.',
  })
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    type: Boolean,
    description: 'If true, returns only active updates',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All latest updates retrieved successfully',
  })
  findAll(@Query('activeOnly') activeOnly?: boolean) {
    return this.latestUpdatesService.findAll(true);
  }

  /**
   * Get a specific latest update
   * This endpoint is public and returns the update data
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific latest update',
    description: 'Retrieves a specific latest update by its ID. This endpoint is public and does not require authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the latest update to retrieve',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Latest update retrieved successfully',
  })
  @ApiNotFoundResponse({
    description: 'Latest update not found',
  })
  findOne(@Param('id') id: string) {
    return this.latestUpdatesService.findOne(id);
  }

  /**
   * Update a latest update
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update a latest update',
    description: 'Updates a latest update with new data. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the latest update to update',
  })
  @ApiBody({
    type: UpdateLatestUpdateDto,
    description: 'The data to update',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Latest update updated successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions',
  })
  @ApiNotFoundResponse({
    description: 'Latest update not found',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request - Invalid data format',
  })
  update(@Param('id') id: string, @Body() updateLatestUpdateDto: UpdateLatestUpdateDto) {
    return this.latestUpdatesService.update(id, updateLatestUpdateDto);
  }

  /**
   * Toggle latest update active status
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Patch(':id/toggle-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Toggle latest update active status',
    description: 'Toggles the active status of a latest update. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the latest update to toggle',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Latest update status toggled successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions',
  })
  @ApiNotFoundResponse({
    description: 'Latest update not found',
  })
  toggleStatus(@Param('id') id: string) {
    return this.latestUpdatesService.toggleStatus(id);
  }

  /**
   * Delete a latest update
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete a latest update',
    description: 'Permanently deletes a latest update. This action cannot be undone. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the latest update to delete',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Latest update deleted successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions',
  })
  @ApiNotFoundResponse({
    description: 'Latest update not found',
  })
  remove(@Param('id') id: string) {
    return this.latestUpdatesService.remove(id);
  }
}
