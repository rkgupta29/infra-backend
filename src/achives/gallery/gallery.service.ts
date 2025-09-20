import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FileUploadService } from '../../common/file-upload/file-upload.service';
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from './dto/update-gallery-item.dto';
import { QueryGalleryDto, SortOrder } from './dto/query-gallery.dto';
import type { Multer } from 'multer';

@Injectable()
export class GalleryService {
  private readonly logger = new Logger(GalleryService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploadService: FileUploadService,
  ) { }

  /**
   * Create a new gallery item with image upload
   * @param createGalleryItemDto - Data for the new gallery item
   * @param imageFile - The image file to upload
   * @returns The created gallery item
   */
  async create(
    createGalleryItemDto: CreateGalleryItemDto,
    imageFile: Multer.File,
  ) {
    try {
      // Validate tab exists
      const tab = await this.prisma.archiveTab.findUnique({
        where: { id: createGalleryItemDto.tabId },
      });

      if (!tab) {
        throw new NotFoundException(`Archive tab with ID '${createGalleryItemDto.tabId}' not found`);
      }

      // Validate image file
      if (!imageFile) {
        throw new BadRequestException('Image file is required');
      }

      // Generate unique filename with timestamp
      const timestamp = Date.now();
      const sanitizedEvent = createGalleryItemDto.event
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .substring(0, 30);

      // Upload image file
      const imageUrl = await this.fileUploadService.uploadImage(
        imageFile,
        `gallery-${sanitizedEvent}-${createGalleryItemDto.year}-${timestamp}`
      );

      // Create gallery item with image URL
      const galleryData = {
        ...createGalleryItemDto,
        image: imageUrl,
      };

      // Delete undefined fields
      Object.keys(galleryData).forEach(key => {
        if (galleryData[key] === undefined) {
          delete galleryData[key];
        }
      });

      return this.prisma.galleryItem.create({
        data: galleryData,
        include: {
          tab: true, // Include related tab
        },
      });
    } catch (error) {
      this.logger.error(`Failed to create gallery item: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get all gallery items with pagination and filtering
   * @param queryGalleryDto - Query parameters for filtering and pagination
   * @returns Paginated list of gallery items
   */
  async findAll(queryGalleryDto: QueryGalleryDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'year',
      sortOrder = SortOrder.DESC,
      year,
      event,
      tabId,
      tabSlug,
    } = queryGalleryDto;

    const skip = (page - 1) * limit;

    // Build the filter object
    const where: any = {
      active: true,
    };

    // Add year filter if provided
    if (year) {
      where.year = year;
    }

    // Add event filter if provided (case-insensitive partial match)
    if (event) {
      where.event = {
        contains: event,
        mode: 'insensitive',
      };
    }

    // Add tab filter if provided (either by ID or slug)
    if (tabId) {
      where.tabId = tabId;
    } else if (tabSlug) {
      // Find tab by slug first
      const tab = await this.prisma.archiveTab.findUnique({
        where: { slug: tabSlug },
      });

      if (!tab) {
        throw new NotFoundException(`Archive tab with slug '${tabSlug}' not found`);
      }

      where.tabId = tab.id;
    }

    // Get total count for pagination
    const total = await this.prisma.galleryItem.count({ where });

    // Get the gallery items
    const galleryItems = await this.prisma.galleryItem.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        tab: true, // Include related tab
      },
    });

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    return {
      data: galleryItems,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext,
        hasPrevious,
      },
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Get a specific gallery item by ID
   * @param id - The ID of the gallery item to retrieve
   * @returns The gallery item data
   */
  async findOne(id: string) {
    const galleryItem = await this.prisma.galleryItem.findUnique({
      where: { id },
      include: {
        tab: true, // Include related tab
      },
    });

    if (!galleryItem) {
      throw new NotFoundException(`Gallery item with ID ${id} not found`);
    }

    return galleryItem;
  }

  /**
   * Delete a gallery item
   * @param id - The ID of the gallery item to delete
   * @returns The deleted gallery item
   */
  async remove(id: string) {
    // Verify gallery item exists
    const galleryItem = await this.findOne(id);

    try {
      // Delete the image file
      if (galleryItem.image) {
        await this.fileUploadService.deleteFile(galleryItem.image);
      }

      // Delete the gallery item record
      return this.prisma.galleryItem.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to delete gallery item: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get gallery items by year
   * @param year - The year to filter by
   * @param queryGalleryDto - Query parameters for pagination
   * @returns Paginated list of gallery items for the specified year
   */
  async findByYear(year: number, queryGalleryDto: QueryGalleryDto) {
    return this.findAll({
      ...queryGalleryDto,
      year,
    });
  }

  /**
   * Get gallery items by tab
   * @param tabIdOrSlug - The ID or slug of the tab to filter by
   * @param queryGalleryDto - Query parameters for pagination
   * @returns Paginated list of gallery items for the specified tab
   */
  async findByTab(tabIdOrSlug: string, queryGalleryDto: QueryGalleryDto) {
    // Check if tabIdOrSlug is a valid ObjectId (MongoDB ID)
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(tabIdOrSlug);

    if (isObjectId) {
      return this.findAll({
        ...queryGalleryDto,
        tabId: tabIdOrSlug,
      });
    } else {
      return this.findAll({
        ...queryGalleryDto,
        tabSlug: tabIdOrSlug,
      });
    }
  }

  /**
   * Get years with gallery items
   * @returns Array of years in which gallery items exist
   */
  async getYears(): Promise<number[]> {
    const result = await this.prisma.galleryItem.groupBy({
      by: ['year'],
      where: { active: true },
      orderBy: { year: 'desc' },
    });

    return result.map(item => item.year);
  }
}