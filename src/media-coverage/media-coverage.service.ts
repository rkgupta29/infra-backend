import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileUploadService } from '../common/file-upload/file-upload.service';
import { CreateMediaCoverageDto } from './dto/create-media-coverage.dto';
import { UpdateMediaCoverageDto } from './dto/update-media-coverage.dto';
import { QueryMediaCoverageDto, SortOrder } from './dto/query-media-coverage.dto';
import type { Multer } from 'multer';

@Injectable()
export class MediaCoverageService {
  private readonly logger = new Logger(MediaCoverageService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploadService: FileUploadService,
  ) { }

  /**
   * Create a new media coverage with image upload
   * @param createMediaCoverageDto - Data for the new media coverage
   * @param imageFile - The image file to upload
   * @returns The created media coverage
   */
  async create(
    createMediaCoverageDto: CreateMediaCoverageDto,
    imageFile: Multer.File,
  ) {
    try {
      // Validate image file
      if (!imageFile) {
        throw new BadRequestException('Cover image file is required');
      }

      // Generate unique filename with timestamp
      const timestamp = Date.now();
      const sanitizedTitle = createMediaCoverageDto.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .substring(0, 30);

      // Upload image file
      const imageUrl = await this.fileUploadService.uploadImage(
        imageFile,
        `media-coverage-${sanitizedTitle}-${createMediaCoverageDto.publicationYear}-${timestamp}`
      );

      // Create media coverage with image URL
      return this.prisma.mediaCoverage.create({
        data: {
          ...createMediaCoverageDto,
          coverImage: imageUrl,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to create media coverage: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get all media coverage with pagination and filtering
   * @param queryMediaCoverageDto - Query parameters for filtering and pagination
   * @returns Paginated list of media coverage
   */
  async findAll(queryMediaCoverageDto: QueryMediaCoverageDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'publicationYear',
      sortOrder = SortOrder.DESC,
      search,
      year,
    } = queryMediaCoverageDto;

    const skip = (page - 1) * limit;

    // Build the filter object
    const where: any = {
      active: true,
    };

    // Add search filter if provided (case-insensitive partial match)
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { subtitle: { contains: search, mode: 'insensitive' } },
        { authorName: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Add year filter if provided
    if (year) {
      where.publicationYear = year;
    }

    // Get total count for pagination
    const total = await this.prisma.mediaCoverage.count({ where });

    // Get the media coverage items
    const mediaCoverageItems = await this.prisma.mediaCoverage.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    return {
      data: mediaCoverageItems,
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
   * Get a specific media coverage by ID
   * @param id - The ID of the media coverage to retrieve
   * @returns The media coverage data
   */
  async findOne(id: string) {
    const mediaCoverage = await this.prisma.mediaCoverage.findUnique({
      where: { id },
    });

    if (!mediaCoverage) {
      throw new NotFoundException(`Media coverage with ID ${id} not found`);
    }

    return mediaCoverage;
  }

  /**
   * Delete a media coverage
   * @param id - The ID of the media coverage to delete
   * @returns The deleted media coverage
   */
  async remove(id: string) {
    // Verify media coverage exists
    const mediaCoverage = await this.findOne(id);

    try {
      // Delete the image file
      if (mediaCoverage.coverImage) {
        await this.fileUploadService.deleteFile(mediaCoverage.coverImage);
      }

      // Delete the media coverage record
      return this.prisma.mediaCoverage.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to delete media coverage: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get media coverage by publication year
   * @param year - The year to filter by
   * @param queryMediaCoverageDto - Query parameters for pagination
   * @returns Paginated list of media coverage for the specified year
   */
  async findByYear(year: number, queryMediaCoverageDto: QueryMediaCoverageDto) {
    return this.findAll({
      ...queryMediaCoverageDto,
      year,
    });
  }

  /**
   * Get years with media coverage
   * @returns Array of years in which media coverage exists
   */
  async getYears(): Promise<number[]> {
    const result = await this.prisma.mediaCoverage.groupBy({
      by: ['publicationYear'],
      where: { active: true },
      orderBy: { publicationYear: 'desc' },
    });

    return result.map(item => item.publicationYear);
  }
}