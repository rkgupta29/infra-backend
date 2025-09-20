import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateResearchPaperDto } from './dto/create-research-paper.dto';
import { UpdateResearchPaperDto } from './dto/update-research-paper.dto';
import { SectorsService } from '../sectors/sectors.service';
import { FileUploadService } from '../../common/file-upload/file-upload.service';
import type { Multer } from 'multer';

// Note: This is a temporary workaround until the Prisma client is regenerated
// after adding the ResearchPaper model to the schema
interface ExtendedPrismaService extends PrismaService {
  researchPaper: any;
}

@Injectable()
export class ResearchPapersService {
  private readonly logger = new Logger(ResearchPapersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly sectorsService: SectorsService,
    private readonly fileUploadService: FileUploadService,
  ) { }

  /**
   * Create a new research paper
   * @param createResearchPaperDto - Data for the new research paper
   * @param files - Uploaded files (image and PDF)
   * @returns The created research paper
   */
  async create(
    createResearchPaperDto: CreateResearchPaperDto,
    files: {
      imageFile?: Multer.File[],
      pdfFile?: Multer.File[],
    },
  ) {
    try {
      // Ensure sectorIds is an array
      const sectorIds = Array.isArray(createResearchPaperDto.sectorIds)
        ? createResearchPaperDto.sectorIds
        : [createResearchPaperDto.sectorIds].filter(Boolean);

      if (!sectorIds.length) {
        throw new BadRequestException('At least one sector ID is required');
      }

      // Validate that all sectors exist
      await this.sectorsService.validateSectorIds(sectorIds);

      // Validate files
      if (!files.imageFile || files.imageFile.length === 0) {
        throw new BadRequestException('Image file is required');
      }

      if (!files.pdfFile || files.pdfFile.length === 0) {
        throw new BadRequestException('PDF file is required');
      }

      const imageFile = files.imageFile[0];
      const pdfFile = files.pdfFile[0];

      // Generate unique filenames with timestamp and hash
      const timestamp = Date.now();
      const imageHash = Math.random().toString(36).substring(2, 10);
      const pdfHash = Math.random().toString(36).substring(2, 10);
      const sanitizedTitle = createResearchPaperDto.title
        ? createResearchPaperDto.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30) // Shorter title to accommodate hash
        : `research-${timestamp}`; // Default if no title provided

      // Upload files with unique filenames
      const imageUrl = await this.fileUploadService.uploadImage(
        imageFile,
        `research-paper-img-${sanitizedTitle}-${timestamp}-${imageHash}`
      );

      const pdfUrl = await this.fileUploadService.uploadPdf(
        pdfFile,
        `research-paper-pdf-${sanitizedTitle}-${timestamp}-${pdfHash}`
      );

      // Parse date string to Date object if provided, otherwise use current date
      const date = createResearchPaperDto.date ? new Date(createResearchPaperDto.date) : new Date();

      // Create research paper with file URLs
      // Prepare data for creating research paper
      const paperData: any = {
        image: imageUrl,
        description: createResearchPaperDto.description,
        link: pdfUrl,
        date,
        active: createResearchPaperDto.active !== undefined ? createResearchPaperDto.active : true,
        sectorIds: sectorIds,
      };

      // Add title if provided
      if (createResearchPaperDto.title) {
        paperData.title = createResearchPaperDto.title;
      } else {
        paperData.title = ''; // Empty string as default
      }

      const researchPaper = await (this.prisma as ExtendedPrismaService).researchPaper.create({
        data: paperData,
        include: {
          sectors: true, // Include related sectors
        },
      });

      this.logger.log(`Created new research paper: ${createResearchPaperDto.title}`);
      return researchPaper;
    } catch (error) {
      this.logger.error(`Failed to create research paper: ${error.message}`);
      throw error;
    }
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