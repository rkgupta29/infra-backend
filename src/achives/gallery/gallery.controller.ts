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
import { GalleryService } from './gallery.service';
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto';
import { QueryGalleryDto } from './dto/query-gallery.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('Archives - Gallery')
@Controller('archives/gallery')
export class GalleryController {
  constructor(private readonly service: GalleryService) { }

  /**
   * Get all gallery items with pagination and filtering
   * This endpoint is public and does not require authentication
   */
  @Get()
  @ApiOperation({
    summary: 'Get all gallery items',
    description: 'Retrieves all gallery items with pagination and filtering. This endpoint is public and does not require authentication.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gallery items retrieved successfully',
    schema: {
      example: {
        data: [
          {
            id: '60d21b4667d0d8992e610c85',
            image: '/assets/images/gallery/event-2023-01.jpg',
            event: 'Annual Conference 2023',
            year: 2023,
            description: 'Keynote speech by the CEO at the annual conference',
            tabId: '60d21b4667d0d8992e610c86',
            active: true,
            createdAt: '2023-06-10T12:00:00.000Z',
            updatedAt: '2023-06-10T12:00:00.000Z',
            tab: {
              id: '60d21b4667d0d8992e610c86',
              name: 'Events',
              slug: 'events',
              description: 'All event photos',
              order: 1,
              active: true,
              createdAt: '2023-06-10T12:00:00.000Z',
              updatedAt: '2023-06-10T12:00:00.000Z',
            },
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
  async findAll(@Query() queryGalleryDto: QueryGalleryDto) {
    return this.service.findAll(queryGalleryDto);
  }

  /**
   * Get years with gallery items
   * This endpoint is public and does not require authentication
   */
  @Get('years')
  @ApiOperation({
    summary: 'Get years with gallery items',
    description: 'Retrieves all years in which gallery items exist. This endpoint is public and does not require authentication.',
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
   * Get gallery items by year
   * This endpoint is public and does not require authentication
   */
  @Get('years/:year')
  @ApiOperation({
    summary: 'Get gallery items by year',
    description: 'Retrieves gallery items for a specific year. This endpoint is public and does not require authentication.',
  })
  @ApiParam({
    name: 'year',
    description: 'The year to filter by',
    example: '2023',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gallery items retrieved successfully',
  })
  async findByYear(
    @Param('year') year: string,
    @Query() queryGalleryDto: QueryGalleryDto,
  ) {
    const yearNum = parseInt(year, 10);
    if (isNaN(yearNum)) {
      throw new BadRequestException('Year must be a valid number');
    }
    return this.service.findByYear(yearNum, queryGalleryDto);
  }

  /**
   * Get gallery items by tab
   * This endpoint is public and does not require authentication
   */
  @Get('tabs/:tabIdOrSlug')
  @ApiOperation({
    summary: 'Get gallery items by tab',
    description: 'Retrieves gallery items for a specific tab (by ID or slug). This endpoint is public and does not require authentication.',
  })
  @ApiParam({
    name: 'tabIdOrSlug',
    description: 'The ID or slug of the tab to filter by',
    example: 'events',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gallery items retrieved successfully',
  })
  @ApiNotFoundResponse({
    description: 'Tab not found',
  })
  async findByTab(
    @Param('tabIdOrSlug') tabIdOrSlug: string,
    @Query() queryGalleryDto: QueryGalleryDto,
  ) {
    return this.service.findByTab(tabIdOrSlug, queryGalleryDto);
  }

  /**
   * Get a specific gallery item by ID
   * This endpoint is public and does not require authentication
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific gallery item',
    description: 'Retrieves a specific gallery item by ID. This endpoint is public and does not require authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the gallery item to retrieve',
    example: '60d21b4667d0d8992e610c85',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gallery item retrieved successfully',
    schema: {
      example: {
        id: '60d21b4667d0d8992e610c85',
        image: '/assets/images/gallery/event-2023-01.jpg',
        event: 'Annual Conference 2023',
        year: 2023,
        description: 'Keynote speech by the CEO at the annual conference',
        tabId: '60d21b4667d0d8992e610c86',
        active: true,
        createdAt: '2023-06-10T12:00:00.000Z',
        updatedAt: '2023-06-10T12:00:00.000Z',
        tab: {
          id: '60d21b4667d0d8992e610c86',
          name: 'Events',
          slug: 'events',
          description: 'All event photos',
          order: 1,
          active: true,
          createdAt: '2023-06-10T12:00:00.000Z',
          updatedAt: '2023-06-10T12:00:00.000Z',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Gallery item not found',
  })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /**
   * Create a new gallery item with image upload
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create a new gallery item',
    description: 'Creates a new gallery item with image upload. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        event: {
          type: 'string',
          example: 'Annual Conference 2023',
        },
        year: {
          type: 'integer',
          example: 2023,
        },
        description: {
          type: 'string',
          example: 'Keynote speech by the CEO at the annual conference',
        },
        tabId: {
          type: 'string',
          example: '60d21b4667d0d8992e610c86',
        },
        active: {
          type: 'boolean',
          example: true,
        },
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file to upload',
        },
      },
      required: ['event', 'year', 'description', 'tabId', 'file'],
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gallery item created successfully',
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
    @Body() createGalleryItemDto: CreateGalleryItemDto,
    @UploadedFile() file: Multer.File,
  ) {
    // Convert year from string to number if it's a string
    if (typeof createGalleryItemDto.year === 'string') {
      createGalleryItemDto.year = parseInt(createGalleryItemDto.year as any, 10);
    }

    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    return this.service.create(createGalleryItemDto, file);
  }

  /**
   * Delete a gallery item
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete a gallery item',
    description: 'Deletes a specific gallery item. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the gallery item to delete',
    example: '60d21b4667d0d8992e610c85',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gallery item deleted successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions',
  })
  @ApiNotFoundResponse({
    description: 'Gallery item not found',
  })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}