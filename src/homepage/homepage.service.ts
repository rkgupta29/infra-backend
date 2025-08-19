import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get a specific section by key
   * @param sectionKey - The unique identifier for the section
   * @returns The section data, or throws 404 if not found
   */
  async getSection(sectionKey: string) {
    if (!sectionKey || typeof sectionKey !== 'string') {
      throw new BadRequestException('Section key must be a valid string');
    }

    const section = await this.prisma.homepageSection.findUnique({
      where: { sectionKey },
    });

    if (!section) {
      throw new NotFoundException(`Section with key '${sectionKey}' not found`);
    }

    return section;
  }

  /**
   * Get all active sections
   * @returns Array of all active homepage sections
   */
  async getAllSections() {
    // Return all active sections as an array (not as an object keyed by sectionKey)
    return this.prisma.homepageSection.findMany({
      where: { active: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  /**
   * Create a new homepage section
   * @param sectionKey - The unique identifier for the new section
   * @param data - The data object for the new section
   * @returns The created section
   */
  async createSection(sectionKey: string, data: Record<string, any>) {
    if (!sectionKey || typeof sectionKey !== 'string') {
      throw new BadRequestException('Section key must be a valid string');
    }
    if (!data || typeof data !== 'object' || data === null || Array.isArray(data)) {
      throw new BadRequestException('Data must be a non-null object');
    }

    // Check if sectionKey already exists
    const existing = await this.prisma.homepageSection.findUnique({
      where: { sectionKey },
    });
    if (existing) {
      throw new BadRequestException(`Section with key '${sectionKey}' already exists`);
    }

    return this.prisma.homepageSection.create({
      data: {
        sectionKey,
        data,
        active: true,
      },
    });
  }

  /**
   * Get all homepage section keys
   * @returns Array of all section keys for the homepage
   */
  async getHomepageSectionKeys(): Promise<string[]> {
    const sections = await this.prisma.homepageSection.findMany({
      select: { sectionKey: true },
      orderBy: { createdAt: 'asc' },
    });
    return sections.map((section) => section.sectionKey);
  }

  /**
   * Update a section completely (PATCH for the entire section)
   * @param sectionKey - The unique identifier for the section
   * @param data - The complete data object for the section
   * @returns The updated section
   */
  async updateSection(sectionKey: string, data: Record<string, any>) {
    if (!sectionKey || typeof sectionKey !== 'string') {
      throw new BadRequestException('Section key must be a valid string');
    }

    if (!data || typeof data !== 'object' || data === null || Array.isArray(data)) {
      throw new BadRequestException('Data must be a non-null object');
    }

    const section = await this.prisma.homepageSection.findUnique({
      where: { sectionKey },
    });

    if (!section) {
      throw new NotFoundException(`Section with key '${sectionKey}' not found`);
    }

    return this.prisma.homepageSection.update({
      where: { sectionKey },
      data: {
        data,
      },
    });
  }

  // There is no API for patching specific fields within a section.
  // The only patch allowed is for the entire section (updateSection).

  /**
   * Toggle section active status
   * @param sectionKey - The unique identifier for the section
   * @returns The updated section
   */
  async toggleSectionStatus(sectionKey: string) {
    if (!sectionKey || typeof sectionKey !== 'string') {
      throw new BadRequestException('Section key must be a valid string');
    }

    const section = await this.prisma.homepageSection.findUnique({
      where: { sectionKey },
    });

    if (!section) {
      throw new NotFoundException(`Section with key '${sectionKey}' not found`);
    }

    return this.prisma.homepageSection.update({
      where: { sectionKey },
      data: {
        active: !section.active,
      },
    });
  }

  /**
   * Delete a section
   * @param sectionKey - The unique identifier for the section
   * @returns The deleted section
   */
  async deleteSection(sectionKey: string) {
    if (!sectionKey || typeof sectionKey !== 'string') {
      throw new BadRequestException('Section key must be a valid string');
    }

    const section = await this.prisma.homepageSection.findUnique({
      where: { sectionKey },
    });

    if (!section) {
      throw new NotFoundException(`Section with key '${sectionKey}' not found`);
    }

    return this.prisma.homepageSection.delete({
      where: { sectionKey },
    });
  }

  /**
   * Seed homepage content from a JSON file and replace all homepage sections.
   * This will delete all existing homepage sections and re-add them from the JSON file.
   * The JSON file should be in the same folder and named "homepage.seed.json".
   */
 

  async seedHomepageContent() {
    // Path to the JSON file in the same folder as this service
    
    const filePath = path.join(process.cwd(), 'src', 'homepage', 'homepage.seed.json');
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Seed file homepage.seed.json not found');
    }

    let jsonData: any;
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      jsonData = JSON.parse(fileContent);
    } catch (err) {
      throw new BadRequestException('Failed to read or parse homepage.seed.json');
    }

    if (!Array.isArray(jsonData)) {
      throw new BadRequestException('Seed file must contain an array of sections');
    }

    // Validate each section
    for (const section of jsonData) {
      if (
        !section.sectionKey ||
        typeof section.sectionKey !== 'string' ||
        !section.data ||
        typeof section.data !== 'object' ||
        section.data === null ||
        Array.isArray(section.data)
      ) {
        throw new BadRequestException(
          `Invalid section format in seed file for sectionKey: ${section.sectionKey}`
        );
      }
    }

    await this.prisma.homepageSection.deleteMany({});

    const createdSections: any[] = [];
    for (const section of jsonData) {
      createdSections.push(
        await this.prisma.homepageSection.create({
          data: {
            sectionKey: section.sectionKey,
            data: section.data,
            active: section.active !== undefined ? section.active : true,
          },
        })
      );
    }

    return {
      message: 'Homepage content seeded successfully',
      count: createdSections.length,
      sections: createdSections,
    };
  }
}
