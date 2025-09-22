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
    // Create media coverage with provided data
    return this.prisma.mediaCoverage.create({
      data: createMediaCoverageDto,
    });
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
      sortBy = 'date',
      sortOrder = SortOrder.DESC,
      search,
      activeOnly = true,
    } = queryMediaCoverageDto;

    const skip = (page - 1) * limit;

    // Build the filter object
    const where: any = {};




    // Add active filter if activeOnly is true
    if (activeOnly) {
      where.active = true;
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
   * Update a media coverage
   * @param id - The ID of the media coverage to update
   * @param updateMediaCoverageDto - The data to update
   * @returns The updated media coverage
   */
  async update(id: string, updateMediaCoverageDto: UpdateMediaCoverageDto) {
    // Verify media coverage exists and get current data
    const existingItem = await this.findOne(id);

    // If active is not provided in the update, keep the existing value
    const updateData = { ...updateMediaCoverageDto };
    if (updateData.active === undefined) {
      updateData.active = existingItem.active;
    }

    // Update the media coverage record
    return this.prisma.mediaCoverage.update({
      where: { id },
      data: updateData,
    });
  }

  /**
   * Delete a media coverage
   * @param id - The ID of the media coverage to delete
   * @returns The deleted media coverage
   */
  async remove(id: string) {
    // Verify media coverage exists
    await this.findOne(id);

    // Delete the media coverage record
    return this.prisma.mediaCoverage.delete({
      where: { id },
    });
  }



  /**
   * Get the most recent media coverage items (last 3)
   * @param activeOnly - If true, returns only active media coverage items
   * @returns Array of the 3 most recent media coverage items
   */
  async getRecentMediaCoverage(activeOnly: boolean = true) {
    try {
      // Build where clause based on activeOnly parameter
      const where = activeOnly ? { active: true } : {};

      // Get the 3 most recent media coverage items
      const recentItems = await this.prisma.mediaCoverage.findMany({
        where,
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