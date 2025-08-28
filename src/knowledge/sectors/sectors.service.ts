import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';

// Note: This is a temporary workaround until the Prisma client is regenerated
// after adding the Sector model to the schema
interface ExtendedPrismaService extends PrismaService {
  sector: any;
}

@Injectable()
export class SectorsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new sector
   * @param createSectorDto - Data for the new sector
   * @returns The created sector
   */
  async create(createSectorDto: CreateSectorDto) {
    // Check if sector with same name or slug already exists
    const existingSector = await (this.prisma as ExtendedPrismaService).sector.findFirst({
      where: {
        OR: [
          { name: createSectorDto.name },
          { slug: createSectorDto.slug },
        ],
      },
    });

    if (existingSector) {
      throw new ConflictException(
        existingSector.name === createSectorDto.name
          ? `Sector with name '${createSectorDto.name}' already exists`
          : `Sector with slug '${createSectorDto.slug}' already exists`,
      );
    }

    return (this.prisma as ExtendedPrismaService).sector.create({
      data: {
        ...createSectorDto,
        paperIds: [], // Initialize with empty array
      },
    });
  }

  /**
   * Get all sectors
   * @param activeOnly - If true, returns only active sectors
   * @returns Array of all sectors
   */
  async findAll(activeOnly = false) {
    const where = activeOnly ? { active: true } : {};
    return (this.prisma as ExtendedPrismaService).sector.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        papers: true, // Include related research papers
      },
    });
  }

  /**
   * Get a specific sector by ID
   * @param id - The ID of the sector to find
   * @returns The found sector or throws 404 if not found
   */
  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('Sector ID must be provided');
    }

    const sector = await (this.prisma as ExtendedPrismaService).sector.findUnique({
      where: { id },
      include: {
        papers: true, // Include related research papers
      },
    });

    if (!sector) {
      throw new NotFoundException(`Sector with ID '${id}' not found`);
    }

    return sector;
  }

  /**
   * Get a specific sector by slug
   * @param slug - The slug of the sector to find
   * @returns The found sector or throws 404 if not found
   */
  async findBySlug(slug: string) {
    if (!slug) {
      throw new BadRequestException('Sector slug must be provided');
    }

    const sector = await (this.prisma as ExtendedPrismaService).sector.findUnique({
      where: { slug },
      include: {
        papers: true, // Include related research papers
      },
    });

    if (!sector) {
      throw new NotFoundException(`Sector with slug '${slug}' not found`);
    }

    return sector;
  }

  /**
   * Update a sector
   * @param id - The ID of the sector to modify
   * @param updateSectorDto - The data to update
   * @returns The updated sector
   */
  async update(id: string, updateSectorDto: UpdateSectorDto) {
    // Check if sector exists
    await this.findOne(id);

    // If updating name or slug, check for conflicts
    if (updateSectorDto.name || updateSectorDto.slug) {
      const existingSector = await (this.prisma as ExtendedPrismaService).sector.findFirst({
        where: {
          OR: [
            updateSectorDto.name ? { name: updateSectorDto.name } : {},
            updateSectorDto.slug ? { slug: updateSectorDto.slug } : {},
          ],
          NOT: { id },
        },
      });

      if (existingSector) {
        throw new ConflictException(
          existingSector.name === updateSectorDto.name
            ? `Sector with name '${updateSectorDto.name}' already exists`
            : `Sector with slug '${updateSectorDto.slug}' already exists`,
        );
      }
    }

    return (this.prisma as ExtendedPrismaService).sector.update({
      where: { id },
      data: updateSectorDto,
      include: {
        papers: true, // Include related research papers
      },
    });
  }

  /**
   * Toggle the active status of a sector
   * @param id - The ID of the sector to toggle
   * @returns The updated sector
   */
  async toggleStatus(id: string) {
    const sector = await this.findOne(id);

    return (this.prisma as ExtendedPrismaService).sector.update({
      where: { id },
      data: {
        active: !sector.active,
      },
      include: {
        papers: true, // Include related research papers
      },
    });
  }

  /**
   * Delete a sector
   * @param id - The ID of the sector to delete
   * @returns The deleted sector
   */
  async remove(id: string) {
    await this.findOne(id); // Verify it exists

    // Check if any research papers are using this sector
    const papersWithSector = await (this.prisma as ExtendedPrismaService).researchPaper.findMany({
      where: {
        sectorIds: {
          has: id,
        },
      },
    });

    if (papersWithSector.length > 0) {
      throw new BadRequestException(
        `Cannot delete sector because it is used by ${papersWithSector.length} research papers. Please remove the sector from these papers first.`,
      );
    }

    return (this.prisma as ExtendedPrismaService).sector.delete({
      where: { id },
    });
  }

  /**
   * Validate that all sector IDs exist
   * @param sectorIds - Array of sector IDs to validate
   * @returns true if all sectors exist, throws error otherwise
   */
  async validateSectorIds(sectorIds: string[]) {
    if (!sectorIds || sectorIds.length === 0) {
      throw new BadRequestException('At least one sector ID must be provided');
    }

    const sectors = await (this.prisma as ExtendedPrismaService).sector.findMany({
      where: {
        id: {
          in: sectorIds,
        },
      },
    });

    if (sectors.length !== sectorIds.length) {
      const foundIds = sectors.map(sect => sect.id);
      const invalidIds = sectorIds.filter(id => !foundIds.includes(id));
      throw new BadRequestException(`Invalid sector IDs: ${invalidIds.join(', ')}`);
    }

    return true;
  }
}
