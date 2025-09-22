import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEngagementDto, UpdateEngagementDto, QueryEngagementsDto, SortOrder } from './dto';

// Note: This is a temporary workaround until the Prisma client is regenerated
interface ExtendedPrismaService extends PrismaService {
  engagement: any;
}

@Injectable()
export class EngagementsService {
  private readonly logger = new Logger(EngagementsService.name);

  constructor(private readonly prisma: PrismaService) { }

  /**
   * Transform engagement response to ensure consistent API format
   * @param engagement - Raw engagement from database
   * @returns Transformed engagement with new Event schema
   */
  private transformEngagementResponse(engagement: any) {
    // Handle backward compatibility
    const dayTime = engagement.dayTime || 'Time not specified';
    const desc = engagement.desc || engagement.description || 'No description available';
    const ctaText = engagement.ctaText || 'Learn More';

    // Ensure details have the required structure
    let details = engagement.details || {};
    if (typeof details === 'string') {
      try {
        details = JSON.parse(details);
      } catch {
        details = {};
      }
    }

    // Ensure details.date exists
    if (!details.date) {
      details.date = engagement.date;
    }

    // Ensure details has required structure
    const processedDetails = {
      images: details.images || [],
      date: details.date,
      content: details.content || desc,
      cta: details.cta || {
        ctaText: ctaText,
        link: details.link || '#'
      }
    };

    return {
      id: engagement.id,
      date: engagement.date,
      dayTime: dayTime,
      meetingType: engagement.meetingType,
      desc: desc,
      ctaText: ctaText,
      details: processedDetails,
      active: engagement.active,
      createdAt: engagement.createdAt,
      updatedAt: engagement.updatedAt,
    };
  }

  /**
   * Create a new engagement
   * @param createEngagementDto - Data for the new engagement
   * @returns The created engagement
   */
  async create(createEngagementDto: CreateEngagementDto) {
    try {
      // Ensure details have the required structure
      const processedDetails = {
        ...createEngagementDto.details,
        // Ensure details.date exists
        date: createEngagementDto.details.date || createEngagementDto.date,
      };

      // Make sure the data structure matches the Prisma schema
      const engagement = await (this.prisma as ExtendedPrismaService).engagement.create({
        data: {
          date: createEngagementDto.date,
          dayTime: createEngagementDto.dayTime,
          meetingType: createEngagementDto.meetingType,
          desc: createEngagementDto.desc,
          ctaText: createEngagementDto.ctaText,
          details: processedDetails,
          active: createEngagementDto.active ?? true,
        },
      });

      this.logger.log(`Created new engagement for date: ${createEngagementDto.date}`);
      return this.transformEngagementResponse(engagement);
    } catch (error) {
      this.logger.error(`Failed to create engagement: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get all engagements with optional filtering and pagination
   * @param queryParams - Query parameters for filtering and pagination
   * @returns Paginated list of engagements
   */
  async findAll(queryParams: QueryEngagementsDto = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'date',
        sortOrder = SortOrder.DESC,
        year,
        month,
      } = queryParams;

      const skip = (page - 1) * limit;

      // Build the filter object
      const where: any = {};

      // Add year and month filters if provided
      if (year) {
        const yearStr = year.toString();

        if (month) {
          // Format month with leading zero if needed
          const monthStr = month.toString().padStart(2, '0');
          // Filter by year-month prefix
          where.date = {
            startsWith: `${yearStr}-${monthStr}`,
          };
        } else {
          // Filter by year prefix only
          where.date = {
            startsWith: yearStr,
          };
        }
      }

      // Get total count for pagination
      const total = await (this.prisma as ExtendedPrismaService).engagement.count({ where });

      // Get the engagements
      const engagements = await (this.prisma as ExtendedPrismaService).engagement.findMany({
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

      // Transform all engagements to ensure consistent format
      const transformedEngagements = engagements.map(engagement =>
        this.transformEngagementResponse(engagement)
      );

      return {
        data: transformedEngagements,
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
    } catch (error) {
      this.logger.error(`Failed to fetch engagements: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get all years that have engagements
   * @returns Array of years
   */
  async getYears() {
    try {
      const engagements = await (this.prisma as ExtendedPrismaService).engagement.findMany({
        select: { date: true },
        orderBy: { date: 'desc' },
      });

      // Extract unique years from date strings (format: YYYY-MM-DD)
      const years = [...new Set(
        engagements.map(engagement => parseInt(engagement.date.substring(0, 4)))
      )].sort((a: number, b: number) => b - a); // Sort in descending order

      return {
        years,
        count: years.length,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(`Failed to fetch engagement years: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get engagements for a specific year
   * @param year - The year to filter by
   * @returns Engagements for the specified year
   */
  async findByYear(year: number) {
    try {
      const yearStr = year.toString();

      const engagements = await (this.prisma as ExtendedPrismaService).engagement.findMany({
        where: {
          date: {
            startsWith: yearStr,
          },
        },
        orderBy: { date: 'desc' },
      });

      // Transform all engagements to ensure consistent format
      const transformedEngagements = engagements.map(engagement =>
        this.transformEngagementResponse(engagement)
      );

      return {
        data: transformedEngagements,
        year,
        count: engagements.length,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(`Failed to fetch engagements for year ${year}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get engagements for a specific month and year
   * @param year - The year to filter by
   * @param month - The month to filter by (1-12)
   * @returns Engagements for the specified month and year
   */
  async findByMonth(year: number, month: number) {
    try {
      // Validate month
      if (month < 1 || month > 12) {
        throw new Error('Month must be between 1 and 12');
      }

      const yearStr = year.toString();
      const monthStr = month.toString().padStart(2, '0');

      const engagements = await (this.prisma as ExtendedPrismaService).engagement.findMany({
        where: {
          date: {
            startsWith: `${yearStr}-${monthStr}`,
          },
        },
        orderBy: { date: 'asc' },
      });

      // Transform all engagements to ensure consistent format
      const transformedEngagements = engagements.map(engagement =>
        this.transformEngagementResponse(engagement)
      );

      return {
        data: transformedEngagements,
        year,
        month,
        count: engagements.length,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(`Failed to fetch engagements for ${year}-${month}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get a specific engagement by ID
   * @param id - Engagement ID
   * @returns The engagement
   */
  async findOne(id: string) {
    try {
      const engagement = await (this.prisma as ExtendedPrismaService).engagement.findUnique({
        where: { id },
      });

      if (!engagement) {
        throw new NotFoundException(`Engagement with ID ${id} not found`);
      }

      return this.transformEngagementResponse(engagement);
    } catch (error) {
      this.logger.error(`Failed to fetch engagement ${id}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Update an engagement
   * @param id - Engagement ID
   * @param updateEngagementDto - Updated data
   * @returns The updated engagement
   */
  async update(id: string, updateEngagementDto: UpdateEngagementDto) {
    try {
      // Check if engagement exists
      await this.findOne(id);

      // Update engagement
      const data: any = {};

      // Only include fields that are present in the DTO
      if (updateEngagementDto.date !== undefined) data.date = updateEngagementDto.date;
      if (updateEngagementDto.dayTime !== undefined) data.dayTime = updateEngagementDto.dayTime;
      if (updateEngagementDto.meetingType !== undefined) data.meetingType = updateEngagementDto.meetingType;
      if (updateEngagementDto.desc !== undefined) data.desc = updateEngagementDto.desc;
      if (updateEngagementDto.ctaText !== undefined) data.ctaText = updateEngagementDto.ctaText;
      if (updateEngagementDto.details !== undefined) {
        // Ensure details have the required structure
        const processedDetails = {
          ...updateEngagementDto.details,
          // Ensure details.date exists
          date: updateEngagementDto.details.date || updateEngagementDto.date || data.date,
        };
        data.details = processedDetails;
      }
      if (updateEngagementDto.active !== undefined) data.active = updateEngagementDto.active;

      const updatedEngagement = await (this.prisma as ExtendedPrismaService).engagement.update({
        where: { id },
        data,
      });

      this.logger.log(`Updated engagement: ${id}`);
      return this.transformEngagementResponse(updatedEngagement);
    } catch (error) {
      this.logger.error(`Failed to update engagement ${id}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Delete an engagement
   * @param id - Engagement ID
   * @returns Deletion confirmation
   */
  async remove(id: string) {
    try {
      // Check if engagement exists
      await this.findOne(id);

      // Delete the engagement
      await (this.prisma as ExtendedPrismaService).engagement.delete({
        where: { id },
      });

      this.logger.log(`Deleted engagement: ${id}`);
      return { success: true, message: 'Engagement deleted successfully' };
    } catch (error) {
      this.logger.error(`Failed to delete engagement ${id}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get the primary event (closest upcoming event)
   * @returns The primary event or null if no upcoming events
   */
  async getPrimaryEvent() {
    try {
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

      // Find the closest upcoming event
      const upcomingEvents = await (this.prisma as ExtendedPrismaService).engagement.findMany({
        where: {
          date: {
            gte: todayStr, // Date is greater than or equal to today (upcoming)
          },
        },
        orderBy: {
          date: 'asc', // Get the closest upcoming date
        },
        take: 1,
      });

      const upcomingEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

      // If no upcoming event, get the most recent past event
      if (!upcomingEvent) {
        const recentEvents = await (this.prisma as ExtendedPrismaService).engagement.findMany({
          where: {
            date: {
              lt: todayStr, // Date is less than today (past)
            },
          },
          orderBy: {
            date: 'desc', // Get the most recent past date
          },
          take: 1,
        });

        const recentEvent = recentEvents.length > 0 ? recentEvents[0] : null;

        return {
          event: recentEvent ? this.transformEngagementResponse(recentEvent) : null,
          type: 'recent',
          lastUpdated: new Date().toISOString(),
        };
      }

      return {
        event: upcomingEvent ? this.transformEngagementResponse(upcomingEvent) : null,
        type: 'upcoming',
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(`Failed to fetch primary event: ${error.message}`);
      throw error;
    }
  }
}