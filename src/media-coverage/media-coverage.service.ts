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
   * Create a new media coverage
   * @param createMediaCoverageDto - Data for the new media coverage
   * @param coverImageFile - Cover image file to upload
   * @returns The created media coverage
   */
  async create(createMediaCoverageDto: CreateMediaCoverageDto, coverImageFile: Multer.File) {
    try {
      if (!coverImageFile) {
        throw new BadRequestException('Cover image file is required');
      }

      // Validate the date field (should be in yyyy/mm/dd format)
      let date: Date;
      if (createMediaCoverageDto.date) {
        // Accepts yyyy/mm/dd or yyyy-mm-dd
        const dateStr = createMediaCoverageDto.date.trim();
        // Regex for yyyy/mm/dd
        const dateRegex = /^\d{4}[\/-]\d{2}[\/-]\d{2}$/;
        if (!dateRegex.test(dateStr)) {
          throw new BadRequestException('Date must be in yyyy/mm/dd format');
        }
        // Replace / with - for Date parsing consistency
        const normalizedDateStr = dateStr.replace(/\//g, '-');
        date = new Date(normalizedDateStr);
        // Check if date is valid
        if (isNaN(date.getTime())) {
          throw new BadRequestException('Invalid date value');
        }
      } else {
        date = new Date();
      }

      // Generate unique filename with timestamp and hash
      const timestamp = Date.now();
      const imageHash = Math.random().toString(36).substring(2, 10);
      const sanitizedTitle = (createMediaCoverageDto.title || createMediaCoverageDto.category || 'media')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .substring(0, 30);

      // Upload cover image
      const imageUrl = await this.fileUploadService.uploadImage(
        coverImageFile,
        `media-coverage-${sanitizedTitle}-${timestamp}-${imageHash}`
      );

      // Create media coverage with uploaded image URL
      const data = {
        ...createMediaCoverageDto,
        image: imageUrl,
        date: createMediaCoverageDto.date, // Keep as string after validation
        active: createMediaCoverageDto.active !== undefined ? createMediaCoverageDto.active : true,
      };

      return this.prisma.mediaCoverage.create({
        data,
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
   * @param coverImageFile - Optional cover image file to upload
   * @returns The updated media coverage
   */
  async update(id: string, updateMediaCoverageDto: UpdateMediaCoverageDto, coverImageFile?: Multer.File) {
    try {
      // Verify media coverage exists and get current data
      const existingItem = await this.findOne(id);

      const updateData: any = { ...updateMediaCoverageDto };

      // Validate the date field if provided (should be in yyyy/mm/dd format)
      if (updateMediaCoverageDto.date) {
        // Accepts yyyy/mm/dd or yyyy-mm-dd
        const dateStr = updateMediaCoverageDto.date.trim();
        // Regex for yyyy/mm/dd
        const dateRegex = /^\d{4}[\/-]\d{2}[\/-]\d{2}$/;
        if (!dateRegex.test(dateStr)) {
          throw new BadRequestException('Date must be in yyyy/mm/dd format');
        }
        // Replace / with - for Date parsing consistency
        const normalizedDateStr = dateStr.replace(/\//g, '-');
        const date = new Date(normalizedDateStr);
        // Check if date is valid
        if (isNaN(date.getTime())) {
          throw new BadRequestException('Invalid date value');
        }
        // Update the date field in updateData (keep as string after validation)
        updateData.date = updateMediaCoverageDto.date;
      }

      // Handle cover image upload if provided
      if (coverImageFile) {
        // Generate unique filename with timestamp and hash
        const timestamp = Date.now();
        const imageHash = Math.random().toString(36).substring(2, 10);
        const sanitizedTitle = updateMediaCoverageDto.title || existingItem.title || updateMediaCoverageDto.category || existingItem.category || 'media';
        const formattedTitle = sanitizedTitle
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30);

        // Upload new cover image
        const imageUrl = await this.fileUploadService.uploadImage(
          coverImageFile,
          `media-coverage-${formattedTitle}-${timestamp}-${imageHash}`
        );

        // Delete old image if exists and is in our assets
        if (existingItem.image && existingItem.image.startsWith('/assets/')) {
          await this.fileUploadService.deleteFile(
            existingItem.image.replace('/assets/', '')
          );
        }

        // Add new image URL to update data
        updateData.image = imageUrl;
      }

      // Preserve existing values for fields not provided in the update
      if (updateData.active === undefined) {
        updateData.active = existingItem.active;
      }

      // Update the media coverage record
      return this.prisma.mediaCoverage.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      this.logger.error(`Failed to update media coverage: ${error.message}`);
      throw error;
    }
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

  async getRecentMediaCoverage(activeOnly: boolean = true) {
    try {
      // Fetch all items (Prisma sees date as string)
      const allItems = await this.prisma.mediaCoverage.findMany({
        where: activeOnly ? { active: true } : {},
      });

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Parse yyyy/mm/dd string -> Date
      const parseDate = (dateStr: string): Date => {
        const [year, month, day] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
      };

      // Filter only upcoming items
      const upcomingItems = allItems.filter((item) => {
        const itemDate = parseDate(item.date);
        return itemDate >= today;
      });

      // Sort ascending (closest first)
      upcomingItems.sort(
        (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime(),
      );

      const closest = upcomingItems.length > 0 ? upcomingItems[0] : null;

      return {
        data: closest ? [closest] : [],
        count: closest ? 1 : 0,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error: any) {
      this.logger.error(
        `Failed to fetch upcoming media coverage: ${error.message}`,
      );
      throw error;
    }
  }


}