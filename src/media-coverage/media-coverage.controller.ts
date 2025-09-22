import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  UseGuards,
  Body,
  HttpStatus,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { MediaCoverageService } from './media-coverage.service';
import { CreateMediaCoverageDto } from './dto/create-media-coverage.dto';
import { UpdateMediaCoverageDto } from './dto/update-media-coverage.dto';
import { QueryMediaCoverageDto } from './dto/query-media-coverage.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Archives - Media Coverage')
@Controller('archives/media-coverage')
export class MediaCoverageController {
  constructor(private readonly service: MediaCoverageService) { }

  /**
   * Get all media coverage with pagination and filtering
   * This endpoint is public and does not require authentication
   */
  @Get()
  @ApiOperation({
    summary: 'Get all media coverage',
    description: 'Retrieves all media coverage with pagination and filtering. This endpoint is public and does not require authentication.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination (default: 1)',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page (default: 10, max: 50)',
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search term to filter by title, subtitle, or author name',
    type: String,
    example: 'infrastructure',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Sort by field (default: date)',
    type: String,
    example: 'date',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: 'Sort order (default: desc)',
    enum: ['asc', 'desc'],
    example: 'desc',
  })
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    description: 'If true, returns only active media coverage; if false, returns all items regardless of active status (default: true)',
    type: Boolean,
    example: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Media coverage retrieved successfully',
    schema: {
      example: {
        data: [
          {
            id: '60d21b4667d0d8992e610c85',
            title: 'Infrastructure Development in Rural Areas',
            subtitle: 'A comprehensive analysis of recent initiatives',
            authorName: 'The Economic Times',
            date: 'July 15, 2023',
            coverImage: '/assets/images/media-coverage/infrastructure-development.jpg',
            active: true,
            createdAt: '2023-06-10T12:00:00.000Z',
            updatedAt: '2023-06-10T12:00:00.000Z',
          },
        ],
        meta: {
          total: 100,
          page: 1,
          limit: 10,
          totalPages: 10,
          hasNext: true,
          hasPrevious: false,
        },
        lastUpdated: '2023-06-10T12:00:00.000Z',
      },
    },
  })
  async findAll(@Query() queryMediaCoverageDto: QueryMediaCoverageDto) {
    return this.service.findAll(queryMediaCoverageDto);
  }

  /**
   * Get the most recent media coverage items (last 3)
   * This endpoint is public and does not require authentication
   */
  @Get('recent')
  @ApiOperation({
    summary: 'Get recent media coverage',
    description: 'Retrieves the 3 most recent media coverage items. This endpoint is public and does not require authentication.',
  })
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    description: 'If true, returns only active media coverage items; if false, returns all items regardless of active status (default: true)',
    type: Boolean,
    example: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Recent media coverage retrieved successfully',
    schema: {
      example: {
        data: [
          {
            id: '60d21b4667d0d8992e610c85',
            title: 'Infrastructure Development in Rural Areas',
            subtitle: 'A comprehensive analysis of recent initiatives',
            authorName: 'The Economic Times',
            date: 'July 15, 2023',
            coverImage: '/assets/images/media-coverage/infrastructure-development.jpg',
            active: true,
            createdAt: '2023-06-10T12:00:00.000Z',
            updatedAt: '2023-06-10T12:00:00.000Z',
          },
          {
            id: '60d21b4667d0d8992e610c86',
            title: 'Urban Planning Innovations',
            subtitle: 'New approaches to sustainable city development',
            authorName: 'The Hindu',
            date: 'June 20, 2023',
            coverImage: '/assets/images/media-coverage/urban-planning.jpg',
            active: true,
            createdAt: '2023-06-05T12:00:00.000Z',
            updatedAt: '2023-06-05T12:00:00.000Z',
          },
          {
            id: '60d21b4667d0d8992e610c87',
            title: 'Transportation Infrastructure Challenges',
            subtitle: 'Addressing the growing needs of metropolitan areas',
            authorName: 'India Today',
            date: 'May 10, 2023',
            coverImage: '/assets/images/media-coverage/transportation.jpg',
            active: true,
            createdAt: '2023-05-01T12:00:00.000Z',
            updatedAt: '2023-05-01T12:00:00.000Z',
          }
        ],
        count: 3,
        lastUpdated: '2023-06-10T12:00:00.000Z',
      },
    },
  })
  async getRecentMediaCoverage(@Query('activeOnly') activeOnly?: string) {
    const isActiveOnly = activeOnly === undefined ? true : activeOnly.toLowerCase() === 'true';
    return this.service.getRecentMediaCoverage(isActiveOnly);
  }

  /**
   * Get a specific media coverage by ID
   * This endpoint is public and does not require authentication
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific media coverage',
    description: 'Retrieves a specific media coverage by ID. This endpoint is public and does not require authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the media coverage to retrieve',
    example: '60d21b4667d0d8992e610c85',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Media coverage retrieved successfully',
    schema: {
      example: {
        id: '60d21b4667d0d8992e610c85',
        title: 'Infrastructure Development in Rural Areas',
        subtitle: 'A comprehensive analysis of recent initiatives',
        authorName: 'The Economic Times',
        date: 'July 15, 2023',
        coverImage: '/assets/images/media-coverage/infrastructure-development.jpg',
        active: true,
        createdAt: '2023-06-10T12:00:00.000Z',
        updatedAt: '2023-06-10T12:00:00.000Z',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Media coverage not found',
  })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /**
   * Create a new media coverage
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create a new media coverage',
    description: 'Creates a new media coverage entry in the database. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Infrastructure Development in Rural Areas',
        },
        subtitle: {
          type: 'string',
          example: 'A comprehensive analysis of recent initiatives',
        },
        authorName: {
          type: 'string',
          example: 'The Economic Times',
        },
        date: {
          type: 'string',
          example: 'July 15, 2023',
        },
        active: {
          type: 'boolean',
          example: true,
        },
        coverImage: {
          type: 'string',
          example: '/assets/images/media-coverage/infrastructure-development.jpg',
          description: 'URL to the cover image',
        },
      },
      required: ['title', 'authorName', 'date', 'coverImage'],
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Media coverage created successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions',
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMediaCoverageDto: CreateMediaCoverageDto) {
    return this.service.create(createMediaCoverageDto);
  }

  /**
   * Delete a media coverage
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete a media coverage',
    description: 'Deletes a specific media coverage. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the media coverage to delete',
    example: '60d21b4667d0d8992e610c85',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Media coverage deleted successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions',
  })
  @ApiNotFoundResponse({
    description: 'Media coverage not found',
  })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  /**
   * Update a media coverage
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update a media coverage',
    description: 'Updates a specific media coverage entry in the database. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the media coverage to update',
    example: '60d21b4667d0d8992e610c85',
  })
  @ApiBody({ type: UpdateMediaCoverageDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Media coverage updated successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions',
  })
  @ApiNotFoundResponse({
    description: 'Media coverage not found',
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateMediaCoverageDto: UpdateMediaCoverageDto,
  ) {
    return this.service.update(id, updateMediaCoverageDto);
  }
}