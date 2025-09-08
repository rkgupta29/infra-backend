import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ContactService {
    constructor(private readonly prisma: PrismaService) { }

    /**
     * Get a specific section by key
     * @param sectionKey - The unique identifier for the section
     * @returns The section data, or throws 404 if not found
     */
    async getSection(sectionKey: string) {
        if (!sectionKey || typeof sectionKey !== 'string') {
            throw new BadRequestException('Section key must be a valid string');
        }

        const section = await this.prisma.contactSection.findUnique({
            where: { sectionKey },
        });

        if (!section) {
            throw new NotFoundException(`Section with key '${sectionKey}' not found`);
        }

        return section;
    }

    /**
     * Get all active sections
     * @returns Array of all active contact sections
     */
    async getAllSections() {
        // Return all active sections as an array (not as an object keyed by sectionKey)
        return this.prisma.contactSection.findMany({
            where: { active: true },
            orderBy: { createdAt: 'asc' },
        });
    }

    /**
     * Create a new contact section
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
        const existing = await this.prisma.contactSection.findUnique({
            where: { sectionKey },
        });
        if (existing) {
            throw new BadRequestException(`Section with key '${sectionKey}' already exists`);
        }

        return this.prisma.contactSection.create({
            data: {
                sectionKey,
                data,
                active: true,
            },
        });
    }

    /**
     * Get all contact section keys
     * @returns Array of all section keys for the contact page
     */
    async getContactSectionKeys(): Promise<string[]> {
        const sections = await this.prisma.contactSection.findMany({
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

        const section = await this.prisma.contactSection.findUnique({
            where: { sectionKey },
        });

        if (!section) {
            throw new NotFoundException(`Section with key '${sectionKey}' not found`);
        }

        return this.prisma.contactSection.update({
            where: { sectionKey },
            data: {
                data,
            },
        });
    }

    /**
     * Toggle section active status
     * @param sectionKey - The unique identifier for the section
     * @returns The updated section
     */
    async toggleSectionStatus(sectionKey: string) {
        if (!sectionKey || typeof sectionKey !== 'string') {
            throw new BadRequestException('Section key must be a valid string');
        }

        const section = await this.prisma.contactSection.findUnique({
            where: { sectionKey },
        });

        if (!section) {
            throw new NotFoundException(`Section with key '${sectionKey}' not found`);
        }

        return this.prisma.contactSection.update({
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

        const section = await this.prisma.contactSection.findUnique({
            where: { sectionKey },
        });

        if (!section) {
            throw new NotFoundException(`Section with key '${sectionKey}' not found`);
        }

        return this.prisma.contactSection.delete({
            where: { sectionKey },
        });
    }

    /**
     * Seed contact page content from a JSON file and replace all contact sections.
     * This will delete all existing contact sections and re-add them from the JSON file.
     * The JSON file should be in the same folder and named "contact.seed.json".
     */
    async seedContactContent() {
        // Path to the JSON file in the same folder as this service
        const filePath = path.join(process.cwd(), 'src', 'homepage', 'contact.seed.json');
        if (!fs.existsSync(filePath)) {
            throw new NotFoundException('Seed file contact.seed.json not found');
        }

        let jsonData: any;
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            jsonData = JSON.parse(fileContent);
        } catch (err) {
            throw new BadRequestException('Failed to read or parse contact.seed.json');
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

        await this.prisma.contactSection.deleteMany({});

        const createdSections: any[] = [];
        for (const section of jsonData) {
            createdSections.push(
                await this.prisma.contactSection.create({
                    data: {
                        sectionKey: section.sectionKey,
                        data: section.data,
                        active: section.active !== undefined ? section.active : true,
                    },
                })
            );
        }

        return {
            message: 'Contact page content seeded successfully',
            count: createdSections.length,
            sections: createdSections,
        };
    }
}
