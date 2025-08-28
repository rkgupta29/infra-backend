import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateResearchPaperDto } from './dto/create-research-paper.dto';
import { UpdateResearchPaperDto } from './dto/update-research-paper.dto';
import { SectorsService } from '../sectors/sectors.service';

// Note: This is a temporary workaround until the Prisma client is regenerated
// after adding the ResearchPaper model to the schema
interface ExtendedPrismaService extends PrismaService {
  researchPaper: any;
}

@Injectable()
export class ResearchPapersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sectorsService: SectorsService,
  ) {}

  /**
   * Create a new research paper
   * @param createResearchPaperDto - Data for the new research paper
   * @returns The created research paper
   */
  async create(createResearchPaperDto: CreateResearchPaperDto) {
    // Validate that all sectors exist
    await this.sectorsService.validateSectorIds(createResearchPaperDto.sectorIds);

    // Parse date string to Date object
    const date = new Date(createResearchPaperDto.date);

    return (this.prisma as ExtendedPrismaService).researchPaper.create({
      data: {
        image: createResearchPaperDto.image,
        title: createResearchPaperDto.title,
        description: createResearchPaperDto.description,
        link: createResearchPaperDto.link,
        date,
        active: createResearchPaperDto.active !== undefined ? createResearchPaperDto.active : true,
        sectorIds: createResearchPaperDto.sectorIds,
      },
      include: {
        sectors: true, // Include related sectors
      },
    });
  }

  /**
   * Get all research papers
   * @param activeOnly - If true, returns only active research papers
   * @param sectorId - Optional sector ID to filter by
   * @param page - Page number (starts from 1)
   * @param limit - Number of items per page
   * @returns Array of all research papers with pagination
   */
  async findAll(activeOnly = false, sectorId?: string, page = 1, limit = 10) {
    const where: any = {};
    
    // Filter by active status if requested
    if (activeOnly) {
      where.active = true;
    }
    
    // Filter by sector if provided
    if (sectorId) {
      where.sectorIds = {
        has: sectorId,
      };
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await (this.prisma as ExtendedPrismaService).researchPaper.count({
      where,
    });

    // Get paginated research papers
    const researchPapers = await (this.prisma as ExtendedPrismaService).researchPaper.findMany({
      where,
      orderBy: { date: 'desc' },
      include: {
        sectors: true, // Include related sectors
      },
      skip,
      take: limit,
    });

    return {
      researchPapers,
      pagination: {
        totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Get a specific research paper by ID
   * @param id - The ID of the research paper to find
   * @returns The found research paper or throws 404 if not found
   */
  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('Research paper ID must be provided');
    }

    const researchPaper = await (this.prisma as ExtendedPrismaService).researchPaper.findUnique({
      where: { id },
      include: {
        sectors: true, // Include related sectors
      },
    });

    if (!researchPaper) {
      throw new NotFoundException(`Research paper with ID '${id}' not found`);
    }

    return researchPaper;
  }

  /**
   * Update a research paper
   * @param id - The ID of the research paper to modify
   * @param updateResearchPaperDto - The data to update
   * @returns The updated research paper
   */
  async update(id: string, updateResearchPaperDto: UpdateResearchPaperDto) {
    // Verify research paper exists
    await this.findOne(id);

    // Validate sectors if provided
    if (updateResearchPaperDto.sectorIds) {
      await this.sectorsService.validateSectorIds(updateResearchPaperDto.sectorIds);
    }

    // Parse date string to Date object if provided
    const data: any = { ...updateResearchPaperDto };
    if (updateResearchPaperDto.date) {
      data.date = new Date(updateResearchPaperDto.date);
    }

    return (this.prisma as ExtendedPrismaService).researchPaper.update({
      where: { id },
      data,
      include: {
        sectors: true, // Include related sectors
      },
    });
  }

  /**
   * Toggle the active status of a research paper
   * @param id - The ID of the research paper to toggle
   * @returns The updated research paper
   */
  async toggleStatus(id: string) {
    const researchPaper = await this.findOne(id);

    return (this.prisma as ExtendedPrismaService).researchPaper.update({
      where: { id },
      data: {
        active: !researchPaper.active,
      },
      include: {
        sectors: true, // Include related sectors
      },
    });
  }

  /**
   * Delete a research paper
   * @param id - The ID of the research paper to delete
   * @returns The deleted research paper
   */
  async remove(id: string) {
    await this.findOne(id); // Verify it exists

    return (this.prisma as ExtendedPrismaService).researchPaper.delete({
      where: { id },
      include: {
        sectors: true, // Include related sectors
      },
    });
  }

  /**
   * Get research papers by sector
   * @param sectorId - The ID of the sector to filter by
   * @param activeOnly - If true, returns only active research papers
   * @param page - Page number (starts from 1)
   * @param limit - Number of items per page
   * @returns Array of research papers in the specified sector with pagination
   */
  async getResearchPapersBySector(sectorId: string, activeOnly = false, page = 1, limit = 10) {
    // Verify sector exists
    await this.sectorsService.findOne(sectorId);

    return this.findAll(activeOnly, sectorId, page, limit);
  }

  /**
   * Get legacy research papers data (for backward compatibility)
   * This method returns the static data that was previously hardcoded
   * @returns Static research papers data
   */
  async getLegacyResearchPapers() {
    const researchPapers: any[] = [
      {
        id: 13,
        img: "/assets/knowledeg/researchPapers/13.png",
        category: "Infrastructure",
        title: "",
        sectors: "Infrastructure",
        date: " ",
        description: "Removing Barriers to Faster Penetration of Trees Outside Forests Productsin Construction Sector",
        link: "/assets/pdf/removing-barriers-to-faster-penetration-of-trees-final-report.pdf",
      },
      {
        id: 10,
        img: "/assets/knowledeg/researchPapers/12.jpg",
        category: "Urban Planning",
        title: "",
        sectors: "Urban Planning",
        date: " ",
        description: "Relieving urban congestion and promoting tourism through ropeways",
        link: "/assets/pdf/urbanCongestion.pdf",
      },
      // ... other static data
    ];
    
    return {
      researchPapers,
      totalCount: researchPapers.length,
      lastUpdated: new Date().toISOString()
    };
  }
}