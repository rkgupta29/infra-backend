import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLatestUpdateDto } from './dto/create-latest-update.dto';
import { UpdateLatestUpdateDto } from './dto/update-latest-update.dto';

@Injectable()
export class LatestUpdatesService {
  private readonly logger = new Logger(LatestUpdatesService.name);

  constructor(private readonly prisma: PrismaService) { }

  /**
   * Create a new latest update
   * @param createLatestUpdateDto - Data for the new update
   * @returns The created update
   */
  async create(createLatestUpdateDto: CreateLatestUpdateDto) {
    return this.prisma.latestUpdate.create({
      data: createLatestUpdateDto,
    });
  }

  /**
   * Get all latest updates
   * @param activeOnly - If true, returns only active updates
   * @returns Array of all latest updates
   */
  async findAll(activeOnly = false) {
    const where = activeOnly ? { active: true } : {};
    return this.prisma.latestUpdate.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a specific latest update by ID
   * @param id - The ID of the update to find
   * @returns The found update or throws 404 if not found
   */
  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('ID must be provided');
    }

    const update = await this.prisma.latestUpdate.findUnique({
      where: { id },
    });

    if (!update) {
      throw new NotFoundException(`Latest update with ID '${id}' not found`);
    }

    return update;
  }

  /**
   * Update a latest update
   * @param id - The ID of the update to modify
   * @param updateLatestUpdateDto - The data to update
   * @returns The updated update
   */
  async update(id: string, updateLatestUpdateDto: UpdateLatestUpdateDto) {
    await this.findOne(id); // Verify it exists

    return this.prisma.latestUpdate.update({
      where: { id },
      data: updateLatestUpdateDto,
    });
  }

  /**
   * Toggle the active status of a latest update
   * @param id - The ID of the update to toggle
   * @returns The updated update
   */
  async toggleStatus(id: string) {
    const update = await this.findOne(id);

    return this.prisma.latestUpdate.update({
      where: { id },
      data: {
        active: !update.active,
      },
    });
  }

  /**
   * Delete a latest update
   * @param id - The ID of the update to delete
   * @returns The deleted update
   */
  async remove(id: string) {
    await this.findOne(id); // Verify it exists

    return this.prisma.latestUpdate.delete({
      where: { id },
    });
  }

  /**
   * Get latest content from multiple sources
   * Returns the most recent newsletter, blog, research paper, and video
   * @param activeOnly - If true, returns only active items (default: true)
   * @returns Object containing the latest items from each category
   */
  async getLatestContent(activeOnly = true) {
    try {
      this.logger.log('Fetching latest content from multiple sources');

      // Build the filter for active status
      const where = activeOnly ? { active: true } : {};

      // Fetch the latest newsletter
      const latestNewsletter = await this.prisma.newsletter.findFirst({
        where,
        orderBy: { publishedDate: 'desc' },
      });

      // Fetch the latest blog
      const latestBlog = await this.prisma.blog.findFirst({
        where,
        orderBy: { publishedDate: 'desc' },
        include: {
          sectors: true, // Include related sectors
        },
      });

      // Fetch the latest research paper
      const latestResearchPaper = await this.prisma.researchPaper.findFirst({
        where,
        orderBy: { date: 'desc' },
        include: {
          sectors: true, // Include related sectors
        },
      });

      // Fetch the latest video
      const latestVideo = await this.prisma.video.findFirst({
        where,
        orderBy: { date: 'desc' },
        include: {
          categories: true, // Include related categories
        },
      });

      return {
        newsletter: latestNewsletter,
        blog: latestBlog,
        researchPaper: latestResearchPaper,
        video: latestVideo,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(`Failed to fetch latest content: ${error.message}`);
      throw error;
    }
  }
}
