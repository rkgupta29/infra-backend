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
  UseInterceptors,
  UploadedFile,
  BadRequestException,
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
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('Videos Management')
@Controller('archives/videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) { }

  /**
   * Helper method to parse categoryIds from form data
   * @param categoryIds - Can be JSON string, comma-separated string, or array
   * @param isRequired - Whether categoryIds are required (for POST) or optional (for PATCH)
   * @returns Array of category IDs or null for optional empty values
   */
  private parseCategoryIds(categoryIds: any, isRequired: boolean = true): string[] | null {
    if (!categoryIds) {
      if (isRequired) {
        throw new Error('categoryIds is required');
      }
      return null; // Return null for optional cases
    }

    if (Array.isArray(categoryIds)) {
      return categoryIds.filter(id => typeof id === 'string' && id.trim().length > 0);
    }

    if (typeof categoryIds === 'string') {
      // Remove any extra whitespace
      const trimmed = categoryIds.trim();

      // For PATCH, if empty string, return null (don't update)
      if (!isRequired && trimmed === '') {
        return null;
      }

      // Check if it looks like JSON
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) {
            return parsed.filter(id => typeof id === 'string' && id.trim().length > 0);
          }
        } catch (error) {
          throw new Error(`Invalid JSON format for categoryIds: ${error.message}`);
        }
      }

      // Treat as comma-separated values
      const result = trimmed.split(',').map(id => id.trim()).filter(id => id.length > 0);

      if (result.length === 0) {
        if (isRequired) {
          throw new Error('No valid category IDs found in categoryIds');
        }
        return null; // For optional cases
      }

      return result;
    }

    throw new Error('categoryIds must be an array, JSON string, or comma-separated string');
  }

  /**
   * Helper method to check if a value is meaningful (not empty string, null, or undefined)
   * @param value - The value to check
   * @returns true if the value should be used for update
   */
  private hasMeaningfulValue(value: any): boolean {
    return value !== undefined && value !== null && value !== '';
  }

  /**
   * Create a new video
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Create a new video',
    description: 'Creates a new video with image upload. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiBody({
    description: 'Video data with image upload',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Video thumbnail image file (JPG, PNG, GIF, WebP - max 10MB)',
        },
        title: {
          type: 'string',
          description: 'Title of the video',
          example: 'HSR will be the next growth multiplier',
        },
        subtitle: {
          type: 'string',
          description: 'Subtitle of the video (optional)',
          example: 'The Infravision Conversation',
        },
        description: {
          type: 'string',
          description: 'Description of the video',
          example: 'A detailed discussion about high-speed rail infrastructure in India',
        },
        link: {
          type: 'string',
          description: 'URL to the video',
          example: 'https://www.youtube.com/embed/Sr17ZN7FLA4',
        },
        date: {
          type: 'string',
          description: 'Date when the video was published',
          example: '2023-08-27',
        },
        categoryIds: {
          type: 'string',
          description: 'Category IDs as JSON string or comma-separated values',
          example: '68d179f266a336a11192ef1c',
        },
        active: {
          type: 'boolean',
          description: 'Whether the video is active (optional)',
          example: true,
        },
      },
      required: ['title', 'description', 'link', 'date', 'categoryIds'],
    },
  })
  @UseInterceptors(FileInterceptor('image'))
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
  create(
    @Body() body: any,
    @UploadedFile() imageFile?: Multer.File,
  ) {
    try {
      // Parse form data properly
      const createVideoDto: CreateVideoDto = {
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        link: body.link,
        date: body.date,
        image: body.image,
        // Parse categoryIds if it's a string (JSON or comma-separated)
        categoryIds: this.parseCategoryIds(body.categoryIds, true) as string[], // Required for POST
        // Parse active as boolean if provided
        active: body.active === undefined ? undefined : body.active === 'true' || body.active === true,
      };

      return this.videosService.create(createVideoDto, imageFile);
    } catch (error) {
      throw new BadRequestException(`Failed to create video: ${error.message}`);
    }
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
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Update a video',
    description: 'Partially updates a video with new data and optional image upload. Only provided fields will be updated. Empty values are ignored. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the video to update',
  })
  @ApiBody({
    description: 'Video data with optional image upload. Only provide fields you want to update. Empty values will be ignored.',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Video thumbnail image file (JPG, PNG, GIF, WebP - max 10MB) (optional)',
        },
        title: {
          type: 'string',
          description: 'Title of the video (optional - leave empty to not update)',
          example: 'HSR will be the next growth multiplier',
        },
        subtitle: {
          type: 'string',
          description: 'Subtitle of the video (optional - leave empty to not update)',
          example: 'The Infravision Conversation',
        },
        description: {
          type: 'string',
          description: 'Description of the video (optional - leave empty to not update)',
          example: 'A detailed discussion about high-speed rail infrastructure in India',
        },
        link: {
          type: 'string',
          description: 'URL to the video (optional - leave empty to not update)',
          example: 'https://www.youtube.com/embed/Sr17ZN7FLA4',
        },
        date: {
          type: 'string',
          description: 'Date when the video was published (optional - leave empty to not update)',
          example: '2023-08-27',
        },
        categoryIds: {
          type: 'string',
          description: 'Category IDs as JSON string or comma-separated values (optional - leave empty to not update)',
          example: '68d179f266a336a11192ef1c',
        },
        active: {
          type: 'boolean',
          description: 'Whether the video is active (optional - leave empty to not update)',
          example: true,
        },
      },
      required: [],
    },
  })
  @UseInterceptors(FileInterceptor('image'))
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
  update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFile() imageFile?: Multer.File,
  ) {
    try {
      // Parse form data properly - only include meaningful values
      const updateVideoDto: UpdateVideoDto = {};

      // Only add fields that have meaningful values (not empty strings)
      if (this.hasMeaningfulValue(body.title)) {
        updateVideoDto.title = body.title;
      }

      if (this.hasMeaningfulValue(body.subtitle)) {
        updateVideoDto.subtitle = body.subtitle;
      }

      if (this.hasMeaningfulValue(body.description)) {
        updateVideoDto.description = body.description;
      }

      if (this.hasMeaningfulValue(body.link)) {
        updateVideoDto.link = body.link;
      }

      if (this.hasMeaningfulValue(body.date)) {
        updateVideoDto.date = body.date;
      }

      if (this.hasMeaningfulValue(body.image)) {
        updateVideoDto.image = body.image;
      }

      // Parse categoryIds if provided and not empty
      if (body.categoryIds !== undefined) {
        const parsedCategoryIds = this.parseCategoryIds(body.categoryIds, false); // Not required for PATCH
        if (parsedCategoryIds !== null) {
          updateVideoDto.categoryIds = parsedCategoryIds;
        }
      }

      // Parse active as boolean if provided and not empty
      if (this.hasMeaningfulValue(body.active)) {
        updateVideoDto.active = body.active === 'true' || body.active === true;
      }

      return this.videosService.update(id, updateVideoDto, imageFile);
    } catch (error) {
      throw new BadRequestException(`Failed to update video: ${error.message}`);
    }
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