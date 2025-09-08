import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { QueryLeadsDto, SortOrder } from './dto/query-leads.dto';

@Injectable()
export class LeadsService {
    constructor(private readonly prisma: PrismaService) { }

    /**
     * Create a new contact form submission
     * @param createLeadDto - The data for the new submission
     * @returns The created submission
     */
    async create(createLeadDto: CreateLeadDto) {
        return this.prisma.contactFormSubmission.create({
            data: createLeadDto,
        });
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
