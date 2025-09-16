import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMediaCoverageDto } from './dto/create-media-coverage.dto';
import { UpdateMediaCoverageDto } from './dto/update-media-coverage.dto';
import { QueryMediaCoverageDto, SortOrder } from './dto/query-media-coverage.dto';

@Injectable()
export class MediaCoverageService {
  private readonly logger = new Logger(MediaCoverageService.name);

  constructor(private readonly prisma: PrismaService) { }

  /**
   * Create a new media coverage
   * @param createMediaCoverageDto - Data for the new media coverage
   * @returns The created media coverage
   */
  async create(createMediaCoverageDto: CreateMediaCoverageDto) {
    try {
      // Create media coverage with provided data
      const mediaCoverageData = {
        ...createMediaCoverageDto,
      };

      // Delete undefined fields
      Object.keys(mediaCoverageData).forEach(key => {
        if (mediaCoverageData[key] === undefined) {
          delete mediaCoverageData[key];
        }
      });

      return this.prisma.mediaCoverage.create({
        data: mediaCoverageData,
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

  /**
   * Get the most recent media coverage items (last 3)
   * @returns Array of the 3 most recent media coverage items
   */
  async getRecentMediaCoverage() {
    try {
      // Get the 3 most recent media coverage items
      const recentItems = await this.prisma.mediaCoverage.findMany({
        where: { active: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
      });

      return {
        data: recentItems,
        count: recentItems.length,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(`Failed to fetch recent media coverage: ${error.message}`);
      throw error;
    }
  }
}