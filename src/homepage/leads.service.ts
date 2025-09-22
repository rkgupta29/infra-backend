import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileUploadService } from '../common/file-upload/file-upload.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { QueryLeadsDto, SortOrder } from './dto/query-leads.dto';
import type { Multer } from 'multer';

@Injectable()
export class LeadsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly fileUploadService: FileUploadService,
    ) { }

    /**
     * Create a new contact form submission
     * @param createLeadDto - The data for the new submission
     * @param file - Optional file to upload
     * @returns The created submission
     */
    async create(createLeadDto: CreateLeadDto, file?: Multer.File) {
        try {
            let fileUrl: string | undefined;

            // Handle file upload if provided
            if (file) {
                // Check if it's a PDF or an image
                const isPdf = file.mimetype === 'application/pdf';
                const isImage = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.mimetype);

                if (!isPdf && !isImage) {
                    throw new BadRequestException('Invalid file type. Only PDF or image files (JPEG, PNG, GIF, WebP) are allowed.');
                }

                // Generate unique filename
                const timestamp = Date.now();
                const randomHash = Math.random().toString(36).substring(2, 10);
                const sanitizedName = `${createLeadDto.firstName}-${createLeadDto.lastName}`
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, '')
                    .substring(0, 30);

                if (isPdf) {
                    fileUrl = await this.fileUploadService.uploadPdf(file, `contact-${sanitizedName}-${timestamp}-${randomHash}`);
                } else {
                    fileUrl = await this.fileUploadService.uploadImage(file, `contact-${sanitizedName}-${timestamp}-${randomHash}`);
                }
            }

            // Create the submission with file URL if uploaded
            const data = {
                ...createLeadDto,
                fileUrl,
            };

            return this.prisma.contactFormSubmission.create({
                data,
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get all contact form submissions with pagination
     * @param queryLeadsDto - Query parameters for filtering and pagination
     * @returns Paginated list of submissions
     */
    async findAll(queryLeadsDto: QueryLeadsDto) {
        const {
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            sortOrder = SortOrder.DESC,
            search,
            personType,
            interestedIn,
            isRead,
        } = queryLeadsDto;

        const skip = (page - 1) * limit;

        // Build the filter object
        const where: any = {
            isDeleted: false, // Only show non-deleted submissions
        };

        // Add search filter if provided
        if (search) {
            where.OR = [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }

        // Add other filters if provided
        if (personType) {
            where.personType = personType;
        }

        if (interestedIn) {
            where.interestedIn = interestedIn;
        }

        if (isRead !== undefined) {
            where.isRead = isRead;
        }
        // Get total count for pagination
        const total = await this.prisma.contactFormSubmission.count({ where });

        // Get the submissions
        const submissions = await this.prisma.contactFormSubmission.findMany({
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
            data: submissions,
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
     * Get a specific contact form submission by ID
     * @param id - The ID of the submission to retrieve
     * @returns The submission data
     */
    async findOne(id: string) {
        const submission = await this.prisma.contactFormSubmission.findUnique({
            where: { id },
        });

        if (!submission || submission.isDeleted) {
            throw new NotFoundException(`Submission with ID ${id} not found`);
        }

        return submission;
    }

    /**
     * Mark a submission as read
     * @param id - The ID of the submission to mark as read
     * @returns The updated submission
     */
    async markAsRead(id: string) {
        const submission = await this.prisma.contactFormSubmission.findUnique({
            where: { id },
        });

        if (!submission || submission.isDeleted) {
            throw new NotFoundException(`Submission with ID ${id} not found`);
        }

        return this.prisma.contactFormSubmission.update({
            where: { id },
            data: { isRead: true },
        });
    }

    /**
     * Soft delete a submission
     * @param id - The ID of the submission to delete
     * @returns The deleted submission
     */
    async remove(id: string) {
        const submission = await this.prisma.contactFormSubmission.findUnique({
            where: { id },
        });

        if (!submission || submission.isDeleted) {
            throw new NotFoundException(`Submission with ID ${id} not found`);
        }

        return this.prisma.contactFormSubmission.update({
            where: { id },
            data: { isDeleted: true },
        });
    }

    /**
     * Get statistics about submissions
     * @returns Statistics about submissions
     */
    async getStats() {
        const total = await this.prisma.contactFormSubmission.count({
            where: { isDeleted: false },
        });

        const unread = await this.prisma.contactFormSubmission.count({
            where: { isDeleted: false, isRead: false },
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const newToday = await this.prisma.contactFormSubmission.count({
            where: {
                isDeleted: false,
                createdAt: {
                    gte: today,
                },
            },
        });

        return {
            total,
            unread,
            newToday,
        };
    }
}
