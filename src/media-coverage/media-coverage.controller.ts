import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
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
  ApiConsumes,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import { MediaCoverageService } from './media-coverage.service';
import { CreateMediaCoverageDto } from './dto/create-media-coverage.dto';
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
    name: 'year',
    required: false,
    description: 'Filter by publication year',
    type: Number,
    example: 2023,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Sort by field (default: publicationYear)',
    type: String,
    example: 'publicationYear',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: 'Sort order (default: desc)',
    enum: ['asc', 'desc'],
    example: 'desc',
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
            publicationYear: 2023,
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
   * Get years with media coverage
   * This endpoint is public and does not require authentication
   */
  @Get('years')
  @ApiOperation({
    summary: 'Get years with media coverage',
    description: 'Retrieves all years in which media coverage exists. This endpoint is public and does not require authentication.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Years retrieved successfully',
    schema: {
      example: [2023, 2022, 2021],
    },
  })
  async getYears() {
    return this.service.getYears();
  }

  /**
   * Get media coverage by publication year
   * This endpoint is public and does not require authentication
   */
  @Get('years/:year')
  @ApiOperation({
    summary: 'Get media coverage by year',
    description: 'Retrieves media coverage for a specific publication year. This endpoint is public and does not require authentication.',
  })
  @ApiParam({
    name: 'year',
    description: 'The publication year to filter by',
    example: '2023',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Media coverage retrieved successfully',
  })
  async findByYear(
    @Param('year') year: string,
    @Query() queryMediaCoverageDto: QueryMediaCoverageDto,
  ) {
    const yearNum = parseInt(year, 10);
    if (isNaN(yearNum)) {
      throw new BadRequestException('Year must be a valid number');
    }
    return this.service.findByYear(yearNum, queryMediaCoverageDto);
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
        publicationYear: 2023,
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
   * Create a new media coverage with image upload
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create a new media coverage',
    description: 'Creates a new media coverage with image upload. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiConsumes('multipart/form-data')
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
        publicationYear: {
          type: 'integer',
          example: 2023,
        },
        active: {
          type: 'boolean',
          example: true,
        },
        file: {
          type: 'string',
          format: 'binary',
          description: 'Cover image file to upload',
        },
      },
      required: ['title', 'authorName', 'date', 'publicationYear', 'file'],
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
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createMediaCoverageDto: CreateMediaCoverageDto,
    @UploadedFile() file: Multer.File,
  ) {
    // Convert publicationYear from string to number if it's a string
    if (typeof createMediaCoverageDto.publicationYear === 'string') {
      createMediaCoverageDto.publicationYear = parseInt(createMediaCoverageDto.publicationYear as any, 10);
    }

    if (!file) {
      throw new BadRequestException('Cover image file is required');
    }

    return this.service.create(createMediaCoverageDto, file);
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
}