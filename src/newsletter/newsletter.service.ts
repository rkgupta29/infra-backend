import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { QueryNewslettersDto, SortOrder } from './dto/query-newsletters.dto';

@Injectable()
export class NewsletterService {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * Create a new newsletter
   * @param createNewsletterDto - The data for the new newsletter
   * @returns The created newsletter
   */
  async create(createNewsletterDto: CreateNewsletterDto) {
    // Convert publishedDate from string to Date
    const publishedDate = new Date(createNewsletterDto.publishedDate);

    return this.prisma.newsletter.create({
      data: {
        ...createNewsletterDto,
        publishedDate,
      },
    });
  }

  /**
   * Get all newsletters with pagination and filtering
   * @param queryNewslettersDto - Query parameters for filtering and pagination
   * @returns Paginated list of newsletters
   */
  async findAll(queryNewslettersDto: QueryNewslettersDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'publishedDate',
      sortOrder = SortOrder.DESC,
      search,
      year,
    } = queryNewslettersDto;

    const skip = (page - 1) * limit;

    // Build the filter object
    const where: any = {
      active: true,
    };

    // Add search filter if provided
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { subtitle: { contains: search, mode: 'insensitive' } },
        { version: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Add year filter if provided
    if (year) {
      // Filter by year using date range
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

      where.publishedDate = {
        gte: startDate,
        lte: endDate,
      };
    }

    // Get total count for pagination
    const total = await this.prisma.newsletter.count({ where });

    // Get the newsletters
    const newsletters = await this.prisma.newsletter.findMany({
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
      data: newsletters,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext,
        hasPrevious,
      },
    };
  }

  /**
   * Get all publication years for newsletters
   * @returns Array of years in which newsletters were published
   */
  async getPublicationYears(): Promise<number[]> {
    // Get all newsletters
    const newsletters = await this.prisma.newsletter.findMany({
      where: { active: true },
      select: { publishedDate: true },
      orderBy: { publishedDate: 'desc' },
    });

    // Extract years and remove duplicates
    const years = newsletters.map(newsletter => new Date(newsletter.publishedDate).getFullYear());
    const uniqueYears = [...new Set(years)];

    return uniqueYears.sort((a, b) => b - a); // Sort in descending order
  }

  /**
   * Get newsletters by publication year
   * @param year - The year to filter by
   * @param queryNewslettersDto - Query parameters for pagination
   * @returns Paginated list of newsletters for the specified year
   */
  async findByYear(year: string, queryNewslettersDto: QueryNewslettersDto) {
    // Validate year format
    if (!/^\d{4}$/.test(year)) {
      throw new BadRequestException('Year must be in YYYY format');
    }

    // Set year filter and call findAll
    return this.findAll({
      ...queryNewslettersDto,
      year,
    });
  }

  /**
   * Get a specific newsletter by ID
   * @param id - The ID of the newsletter to retrieve
   * @returns The newsletter data
   */
  async findOne(id: string) {
    const newsletter = await this.prisma.newsletter.findUnique({
      where: { id },
    });

    if (!newsletter) {
      throw new NotFoundException(`Newsletter with ID ${id} not found`);
    }

    return newsletter;
  }

  /**
   * Update a newsletter
   * @param id - The ID of the newsletter to update
   * @param updateNewsletterDto - The data to update
   * @returns The updated newsletter
   */
  async update(id: string, updateNewsletterDto: UpdateNewsletterDto) {
    // Check if newsletter exists
    await this.findOne(id);

    // Prepare data for update
    const data: any = { ...updateNewsletterDto };

    // Convert publishedDate from string to Date if provided
    if (updateNewsletterDto.publishedDate) {
      data.publishedDate = new Date(updateNewsletterDto.publishedDate);
    }

    return this.prisma.newsletter.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete a newsletter
   * @param id - The ID of the newsletter to delete
   * @returns The deleted newsletter
   */
  async remove(id: string) {
    // Check if newsletter exists
    await this.findOne(id);

    return this.prisma.newsletter.delete({
      where: { id },
    });
  }

  /**
   * Get the latest three newsletters
   * @returns The latest three newsletters
   */
  async getRecentNewsletters() {
    return this.prisma.newsletter.findMany({
      where: { active: true },
      orderBy: { publishedDate: 'desc' },
      select: {
        id: true,
        title: true,
        subtitle: true,
        version: true,
        publishedDate: true,
        coverImage: true,
        fileUrl: true,
      },
      take: 3,
    });
  }
}