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
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('Videos Management')
@Controller('archives/videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  /**
   * Create a new video
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create a new video',
    description: 'Creates a new video. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiBody({
    type: CreateVideoDto,
    description: 'The data for the new video',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Video created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request - Invalid data format or invalid category IDs',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions',
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  /**
   * Get all videos
   * This endpoint is public and returns all videos
   */
  @Get()
  @ApiOperation({
    summary: 'Get all videos',
    description: 'Retrieves all videos. This endpoint is public and does not require authentication.',
  })
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    type: Boolean,
    description: 'If true, returns only active videos',
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    type: String,
    description: 'Optional category ID to filter videos by',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All videos retrieved successfully',
  })
  findAll(
    @Query('activeOnly') activeOnly?: boolean,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.videosService.findAll(activeOnly === true, categoryId);
  }

  /**
   * Get videos by category
   * This endpoint is public and returns videos in a specific category
   */
  @Get('categories/:categoryId')
  @ApiOperation({
    summary: 'Get videos by category',
    description: 'Retrieves videos in a specific category. This endpoint is public and does not require authentication.',
  })
  @ApiParam({
    name: 'categoryId',
    description: 'The ID of the category to filter by',
  })
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    type: Boolean,
    description: 'If true, returns only active videos',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Videos in category retrieved successfully',
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
  })
  getVideosByCategory(
    @Param('categoryId') categoryId: string,
    @Query('activeOnly') activeOnly?: boolean,
  ) {
    return this.videosService.getVideosByCategory(categoryId, activeOnly === true);
  }


  /**
   * Update a video
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update a video',
    description: 'Updates a video with new data. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the video to update',
  })
  @ApiBody({
    type: UpdateVideoDto,
    description: 'The data to update',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Video updated successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions',
  })
  @ApiNotFoundResponse({
    description: 'Video not found',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request - Invalid data format or invalid category IDs',
  })
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  /**
   * Toggle video active status
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Patch(':id/toggle-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Toggle video active status',
    description: 'Toggles the active status of a video. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the video to toggle',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Video status toggled successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions',
  })
  @ApiNotFoundResponse({
    description: 'Video not found',
  })
  toggleStatus(@Param('id') id: string) {
    return this.videosService.toggleStatus(id);
  }

  /**
   * Delete a video
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete a video',
    description: 'Permanently deletes a video. This action cannot be undone. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the video to delete',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Video deleted successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions',
  })
  @ApiNotFoundResponse({
    description: 'Video not found',
  })
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }

}