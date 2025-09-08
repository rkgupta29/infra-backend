import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArchiveTabDto } from './dto/create-archive-tab.dto';
import { UpdateArchiveTabDto } from './dto/update-archive-tab.dto';

@Injectable()
export class ArchiveTabsService {
    constructor(private readonly prisma: PrismaService) { }

    /**
     * Create a new archive tab
     * @param createArchiveTabDto - Data for the new tab
     * @returns The created tab
     */
    async create(createArchiveTabDto: CreateArchiveTabDto) {
        // Check if tab with same slug already exists
        const existingTab = await this.prisma.archiveTab.findUnique({
            where: { slug: createArchiveTabDto.slug },
        });

        if (existingTab) {
            throw new ConflictException(`Tab with slug '${createArchiveTabDto.slug}' already exists`);
        }

        return this.prisma.archiveTab.create({
            data: createArchiveTabDto,
        });
    }

    /**
     * Get all archive tabs
     * @param activeOnly - If true, returns only active tabs
     * @returns Array of all tabs, sorted by order
     */
    async findAll(activeOnly = false) {
        const where = activeOnly ? { active: true } : {};

        return this.prisma.archiveTab.findMany({
            where,
            orderBy: { order: 'asc' },
        });
    }

    /**
     * Get a specific archive tab by ID
     * @param id - The ID of the tab to find
     * @returns The found tab or throws 404 if not found
     */
    async findOne(id: string) {
        if (!id) {
            throw new BadRequestException('Tab ID must be provided');
        }

        const tab = await this.prisma.archiveTab.findUnique({
            where: { id },
        });

        if (!tab) {
            throw new NotFoundException(`Tab with ID '${id}' not found`);
        }

        return tab;
    }

    /**
     * Get a specific archive tab by slug
     * @param slug - The slug of the tab to find
     * @returns The found tab or throws 404 if not found
     */
    async findBySlug(slug: string) {
        if (!slug) {
            throw new BadRequestException('Tab slug must be provided');
        }

        const tab = await this.prisma.archiveTab.findUnique({
            where: { slug },
        });

        if (!tab) {
            throw new NotFoundException(`Tab with slug '${slug}' not found`);
        }

        return tab;
    }

    /**
     * Update an archive tab
     * @param id - The ID of the tab to modify
     * @param updateArchiveTabDto - The data to update
     * @returns The updated tab
     */
    async update(id: string, updateArchiveTabDto: UpdateArchiveTabDto) {
        // Check if tab exists
        await this.findOne(id);

        // If updating slug, check for conflicts
        if (updateArchiveTabDto.slug) {
            const existingTab = await this.prisma.archiveTab.findUnique({
                where: { slug: updateArchiveTabDto.slug },
            });

            if (existingTab && existingTab.id !== id) {
                throw new ConflictException(`Tab with slug '${updateArchiveTabDto.slug}' already exists`);
            }
        }

        return this.prisma.archiveTab.update({
            where: { id },
            data: updateArchiveTabDto,
        });
    }

    /**
     * Toggle the active status of an archive tab
     * @param id - The ID of the tab to toggle
     * @returns The updated tab
     */
    async toggleStatus(id: string) {
        const tab = await this.findOne(id);

        return this.prisma.archiveTab.update({
            where: { id },
            data: {
                active: !tab.active,
            },
        });
    }

    /**
     * Delete an archive tab
     * @param id - The ID of the tab to delete
     * @returns The deleted tab
     */
    async remove(id: string) {
        await this.findOne(id); // Verify it exists

        return this.prisma.archiveTab.delete({
            where: { id },
        });
    }

    /**
     * Reorder tabs
     * @param tabIds - Array of tab IDs in the desired order
     * @returns Array of updated tabs
     */
    async reorder(tabIds: string[]) {
        if (!tabIds || !Array.isArray(tabIds) || tabIds.length === 0) {
            throw new BadRequestException('Valid array of tab IDs must be provided');
        }

        // Verify all tabs exist
        const tabs = await this.prisma.archiveTab.findMany({
            where: {
                id: {
                    in: tabIds,
                },
            },
        });

        if (tabs.length !== tabIds.length) {
            const foundIds = tabs.map(tab => tab.id);
            const invalidIds = tabIds.filter(id => !foundIds.includes(id));
            throw new BadRequestException(`Invalid tab IDs: ${invalidIds.join(', ')}`);
        }

        // Update order for each tab
        type ArchiveTab = {
            id: string;
            name: string;
            slug: string;
            description: string | null;
            order: number;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
        };

        const updatedTabs: ArchiveTab[] = [];
        for (let i = 0; i < tabIds.length; i++) {
            const updatedTab = await this.prisma.archiveTab.update({
                where: { id: tabIds[i] },
                data: { order: i + 1 }, // Order starts at 1
            });
            updatedTabs.push(updatedTab as ArchiveTab);
        }

        return updatedTabs;
    }
}
