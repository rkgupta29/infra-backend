import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAdvisorDto } from './dto/create-advisor.dto';
import { UpdateAdvisorDto } from './dto/update-advisor.dto';
import { FileUploadService } from '../../common/file-upload/file-upload.service';
import type { Multer } from 'multer';

// Note: This is a temporary workaround until the Prisma client is regenerated
interface ExtendedPrismaService extends PrismaService {
    advisor: any;
}

@Injectable()
export class AdvisorsService {
    private readonly logger = new Logger(AdvisorsService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly fileUploadService: FileUploadService,
    ) { }

    /**
     * Create a new advisor
     */
    async create(
        createAdvisorDto: CreateAdvisorDto,
        imageFile?: Multer.File,
        popupImageFile?: Multer.File,
    ) {
        try {
            let imageUrl = '';
            let popupImgUrl = '';

            // Handle image upload if provided
            if (imageFile) {
                const timestamp = Date.now();
                const randomHash = Math.random().toString(36).substring(2, 10);
                const sanitizedName = createAdvisorDto.title
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, '')
                    .substring(0, 30);

                imageUrl = await this.fileUploadService.uploadImage(
                    imageFile,
                    `advisor-${sanitizedName}-${timestamp}-${randomHash}`
                );
            } else {
                throw new BadRequestException('Image file is required');
            }

            // Handle popup image upload if provided
            if (popupImageFile) {
                const timestamp = Date.now();
                const randomHash = Math.random().toString(36).substring(2, 10);
                const sanitizedName = createAdvisorDto.title
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, '')
                    .substring(0, 30);

                popupImgUrl = await this.fileUploadService.uploadImage(
                    popupImageFile,
                    `advisor-popup-${sanitizedName}-${timestamp}-${randomHash}`
                );
            }

            // Create advisor with file URL
            const advisor = await (this.prisma as ExtendedPrismaService).advisor.create({
                data: {
                    image: imageUrl,
                    title: createAdvisorDto.title,
                    desig: createAdvisorDto.desig,
                    popupdesc: createAdvisorDto.popupdesc,
                    link: createAdvisorDto.link,
                    socialMedia: createAdvisorDto.socialMedia,
                    popupImg: popupImgUrl || null,
                    active: createAdvisorDto.active !== undefined ? createAdvisorDto.active : true,
                },
            });

            this.logger.log(`Created new advisor: ${createAdvisorDto.title}`);
            return advisor;
        } catch (error) {
            this.logger.error(`Failed to create advisor: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get all advisors with pagination
     */
    async findAll(page = 1, limit = 10, activeOnly = false) {
        try {
            const skip = (page - 1) * limit;

            const where = activeOnly ? { active: true } : {};

            const [advisors, total] = await Promise.all([
                (this.prisma as ExtendedPrismaService).advisor.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' },
                }),
                (this.prisma as ExtendedPrismaService).advisor.count({ where }),
            ]);

            const totalPages = Math.ceil(total / limit);

            return {
                data: advisors,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages,
                    hasNext: page < totalPages,
                    hasPrev: page > 1,
                },
            };
        } catch (error) {
            this.logger.error(`Failed to fetch advisors: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get a specific advisor by ID
     */
    async findOne(id: string) {
        const advisor = await (this.prisma as ExtendedPrismaService).advisor.findUnique({
            where: { id },
        });

        if (!advisor) {
            throw new NotFoundException(`Advisor with ID ${id} not found`);
        }

        return advisor;
    }

    /**
     * Update an advisor
     */
    async update(
        id: string,
        updateAdvisorDto: UpdateAdvisorDto,
        imageFile?: Multer.File,
        popupImageFile?: Multer.File,
    ) {
        // Check if advisor exists
        const existingAdvisor = await this.findOne(id);

        try {
            const updateData: any = { ...updateAdvisorDto };

            // Handle image upload if provided
            if (imageFile) {
                const timestamp = Date.now();
                const randomHash = Math.random().toString(36).substring(2, 10);
                const sanitizedName = updateAdvisorDto.title || existingAdvisor.title;
                const formattedName = sanitizedName
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, '')
                    .substring(0, 30);

                const imageUrl = await this.fileUploadService.uploadImage(
                    imageFile,
                    `advisor-${formattedName}-${timestamp}-${randomHash}`
                );

                updateData.image = imageUrl;

                if (existingAdvisor.image && existingAdvisor.image.startsWith('/assets/')) {
                    await this.fileUploadService.deleteFile(
                        existingAdvisor.image.replace('/assets/', '')
                    );
                }
            }

            // Handle popup image upload if provided
            if (popupImageFile) {
                const timestamp = Date.now();
                const randomHash = Math.random().toString(36).substring(2, 10);
                const sanitizedName = updateAdvisorDto.title || existingAdvisor.title;
                const formattedName = sanitizedName
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, '')
                    .substring(0, 30);

                const popupImgUrl = await this.fileUploadService.uploadImage(
                    popupImageFile,
                    `advisor-popup-${formattedName}-${timestamp}-${randomHash}`
                );

                updateData.popupImg = popupImgUrl;

                if (existingAdvisor.popupImg && existingAdvisor.popupImg.startsWith('/assets/')) {
                    await this.fileUploadService.deleteFile(
                        existingAdvisor.popupImg.replace('/assets/', '')
                    );
                }
            }

            // Update advisor
            const updatedAdvisor = await (this.prisma as ExtendedPrismaService).advisor.update({
                where: { id },
                data: updateData,
            });

            this.logger.log(`Updated advisor: ${id}`);
            return updatedAdvisor;
        } catch (error) {
            this.logger.error(`Failed to update advisor: ${error.message}`);
            throw error;
        }
    }

    /**
     * Toggle advisor active status
     */
    async toggleStatus(id: string) {
        // Check if advisor exists
        const advisor = await this.findOne(id);

        // Toggle active status
        return (this.prisma as ExtendedPrismaService).advisor.update({
            where: { id },
            data: { active: !advisor.active },
        });
    }

    /**
     * Delete an advisor
     */
    async remove(id: string) {
        // Check if advisor exists
        const advisor = await this.findOne(id);

        try {
            // Delete the advisor
            await (this.prisma as ExtendedPrismaService).advisor.delete({
                where: { id },
            });

            // Delete image if it exists and is in our assets
            if (advisor.image && advisor.image.startsWith('/assets/')) {
                await this.fileUploadService.deleteFile(
                    advisor.image.replace('/assets/', '')
                );
            }

            // Delete popup image if it exists and is in our assets
            if (advisor.popupImg && advisor.popupImg.startsWith('/assets/')) {
                await this.fileUploadService.deleteFile(
                    advisor.popupImg.replace('/assets/', '')
                );
            }

            this.logger.log(`Deleted advisor: ${id}`);
            return { success: true, message: 'Advisor deleted successfully' };
        } catch (error) {
            this.logger.error(`Failed to delete advisor: ${error.message}`);
            throw error;
        }
    }

    /**
     * Legacy method to get static advisors data
     */
    async getAdvisors() {
        // Try to get from database first
        try {
            const result = await this.findAll(1, 100, true);

            // If we have data in the database, return it
            if (result.data.length > 0) {
                return {
                    advisors: result.data,
                    totalCount: result.meta.total,
                    lastUpdated: new Date().toISOString()
                };
            }
        } catch (error) {
            this.logger.warn('Failed to get advisors from database, falling back to static data');
        }

        // Fallback to static data
        const advisors: any[] = [
            {
                image: "/assets/home/advisory/NasserMunjee.jpg",
                title: "Nasser Munjee",
                desig: "Chairman, Aga Khan Foundation (India)",
                link: "https://www.linkedin.com/in/nasser-munjee-8aaa5316/",
                socialMedia: "linkedin",
                popupImg: "/assets/home/trustees/vinayakImg.png",
                popupdesc: `Naseer Munjee was educated at Cambridge and the London School of Economics in the UK, and the University of Chicago in the US. His career has focused on the creation of financial institutions in India and addressing development challenges in emerging economies.`,
            },
            // More advisors would be here in the actual implementation
        ];

        return {
            advisors,
            totalCount: advisors.length,
            lastUpdated: new Date().toISOString()
        };
    }
}
