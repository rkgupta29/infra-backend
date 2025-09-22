import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FileUploadService } from '../../common/file-upload/file-upload.service';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { QueryAssociationDto } from './dto/query-association.dto';
import type { Multer } from 'multer';

// Note: This is a temporary workaround until the Prisma client is regenerated
interface ExtendedPrismaService extends PrismaService {
    association: any;
}

@Injectable()
export class AssociationsService {
    private readonly logger = new Logger(AssociationsService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly fileUploadService: FileUploadService,
    ) { }

    /**
     * Create a new association with image upload
     * @param createAssociationDto - Data for the new association
     * @param imageFile - The image file to upload
     * @returns The created association
     */
    async create(
        createAssociationDto: CreateAssociationDto,
        imageFile: Multer.File,
    ) {
        try {
            // Validate image file
            if (!imageFile) {
                throw new BadRequestException('Image file is required');
            }

            // Generate unique filename with timestamp
            const timestamp = Date.now();
            const sanitizedTitle = createAssociationDto.title
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '')
                .substring(0, 30);

            // Upload image file
            const imageUrl = await this.fileUploadService.uploadImage(
                imageFile,
                `association-${sanitizedTitle}-${timestamp}`
            );

            // Create association with image URL
            const association = await (this.prisma as ExtendedPrismaService).association.create({
                data: {
                    title: createAssociationDto.title,
                    imageUrl: imageUrl,
                    order: createAssociationDto.order || 0,
                    active: createAssociationDto.active !== undefined ? createAssociationDto.active : true,
                },
            });

            this.logger.log(`Created new association: ${createAssociationDto.title}`);
            return association;
        } catch (error) {
            this.logger.error(`Failed to create association: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get all associations with pagination and filtering
     * @param queryAssociationDto - Query parameters for filtering and pagination
     * @returns Paginated list of associations
     */
    async findAll(queryAssociationDto: QueryAssociationDto) {
        const {
            page = 1,
            limit = 10,
            active,
            search,
        } = queryAssociationDto;

        const skip = (page - 1) * limit;

        // Build the filter object
        const where: any = {};

        // Add active filter if provided
        if (active !== undefined) {
            where.active = active;
        }

        // Add search filter if provided (case-insensitive partial match)
        if (search) {
            where.title = {
                contains: search,
                mode: 'insensitive',
            };
        }

        // Get total count for pagination
        const total = await (this.prisma as ExtendedPrismaService).association.count({ where });

        // Get the associations
        const associations = await (this.prisma as ExtendedPrismaService).association.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                order: 'asc',
            },
        });

        // Calculate pagination metadata
        const totalPages = Math.ceil(total / limit);
        const hasNext = page < totalPages;
        const hasPrevious = page > 1;

        return {
            data: associations,
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
    }

    /**
     * Get a specific association by ID
     * @param id - The ID of the association to retrieve
     * @returns The association data
     */
    async findOne(id: string) {
        const association = await (this.prisma as ExtendedPrismaService).association.findUnique({
            where: { id },
        });

        if (!association) {
            throw new NotFoundException(`Association with ID ${id} not found`);
        }

        return association;
    }

    /**
     * Update an association
     * @param id - The ID of the association to update
     * @param updateAssociationDto - The data to update
     * @param imageFile - Optional new image file to upload
     * @returns The updated association
     */
    async update(id: string, updateAssociationDto: UpdateAssociationDto, imageFile?: Multer.File) {
        // Verify association exists and get current data
        const existingAssociation = await this.findOne(id);

        try {
            const updateData: any = { ...updateAssociationDto };

            // Handle image upload if provided
            if (imageFile) {
                // Generate unique filename with timestamp
                const timestamp = Date.now();
                const randomHash = Math.random().toString(36).substring(2, 10);
                const sanitizedTitle = updateAssociationDto.title || existingAssociation.title;
                const formattedTitle = sanitizedTitle
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, '')
                    .substring(0, 30);

                // Upload new image
                const imageUrl = await this.fileUploadService.uploadImage(
                    imageFile,
                    `association-${formattedTitle}-${timestamp}-${randomHash}`
                );

                // Delete old image if exists and is in our assets
                if (existingAssociation.imageUrl && existingAssociation.imageUrl.startsWith('/assets/')) {
                    await this.fileUploadService.deleteFile(
                        existingAssociation.imageUrl.replace('/assets/', '')
                    );
                }

                // Add new image URL to update data
                updateData.imageUrl = imageUrl;
            }

            // Preserve existing values for fields not provided in the update
            if (updateData.active === undefined) {
                updateData.active = existingAssociation.active;
            }
            if (updateData.order === undefined) {
                updateData.order = existingAssociation.order;
            }

            return (this.prisma as ExtendedPrismaService).association.update({
                where: { id },
                data: updateData,
            });
        } catch (error) {
            this.logger.error(`Failed to update association: ${error.message}`);
            throw error;
        }
    }

    /**
     * Update association image
     * @param id - The ID of the association to update image for
     * @param imageFile - The new image file to upload
     * @returns The updated association
     */
    async updateImage(id: string, imageFile: Multer.File) {
        // Verify association exists and get current data
        const association = await this.findOne(id);

        try {
            if (!imageFile) {
                throw new BadRequestException('Image file is required');
            }

            // Generate unique filename with timestamp
            const timestamp = Date.now();
            const sanitizedTitle = association.title
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '')
                .substring(0, 30);

            // Upload new image
            const imageUrl = await this.fileUploadService.uploadImage(
                imageFile,
                `association-${sanitizedTitle}-${timestamp}`
            );

            // Delete old image if exists
            if (association.imageUrl) {
                await this.fileUploadService.deleteFile(association.imageUrl);
            }

            // Update association with new image URL
            return (this.prisma as ExtendedPrismaService).association.update({
                where: { id },
                data: {
                    imageUrl: imageUrl,
                },
            });
        } catch (error) {
            this.logger.error(`Failed to update association image: ${error.message}`);
            throw error;
        }
    }

    /**
     * Toggle the active status of an association
     * @param id - The ID of the association to toggle
     * @returns The updated association
     */
    async toggleStatus(id: string) {
        const association = await this.findOne(id);

        return (this.prisma as ExtendedPrismaService).association.update({
            where: { id },
            data: {
                active: !association.active,
            },
        });
    }

    /**
     * Delete an association
     * @param id - The ID of the association to delete
     */
    async remove(id: string) {
        const association = await this.findOne(id); // Verify it exists

        try {
            // Delete the image file
            if (association.imageUrl) {
                await this.fileUploadService.deleteFile(association.imageUrl);
            }

            // Delete the association record
            await (this.prisma as ExtendedPrismaService).association.delete({
                where: { id },
            });

            this.logger.log(`Deleted association: ${id}`);
            return { success: true, message: 'Association deleted successfully' };
        } catch (error) {
            this.logger.error(`Failed to delete association: ${error.message}`);
            throw error;
        }
    }
}
