import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Query,
    HttpStatus,
    HttpCode,
    Patch,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiParam,
    ApiUnauthorizedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiConsumes,
    ApiBody,
} from '@nestjs/swagger';
import { LeadsService } from './leads.service';
import { FileUploadService } from '../common/file-upload/file-upload.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { QueryLeadsDto } from './dto/query-leads.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Contact Form Submissions')
@Controller('contact/leads')
export class LeadsController {
    constructor(
        private readonly leadsService: LeadsService,
        private readonly fileUploadService: FileUploadService,
    ) { }

    /**
     * Create a new contact form submission
     * This endpoint is public and does not require authentication
     */
    @Post()
    @ApiOperation({
        summary: 'Submit a contact form',
        description: 'Creates a new contact form submission. This endpoint is public and does not require authentication.',
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The contact form has been submitted successfully',
    })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createLeadDto: CreateLeadDto) {
        return this.leadsService.create(createLeadDto);
    }

    /**
     * Get all contact form submissions with pagination
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPERADMIN', 'ADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Get all contact form submissions',
        description: 'Retrieves all contact form submissions with pagination. This endpoint requires ADMIN or SUPERADMIN authentication.',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'All contact form submissions retrieved successfully',
        schema: {
            example: {
                data: [
                    {
                        id: '60d21b4667d0d8992e610c85',
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'john.doe@example.com',
                        contactNumber: '+91 98765 43210',
                        personType: 'Student',
                        interestedIn: 'Research Collaboration',
                        message: 'I would like to inquire about your upcoming projects.',
                        fileUrl: 'https://storage.example.com/uploads/file.pdf',
                        links: 'https://example.com/myproject',
                        isRead: false,
                        isDeleted: false,
                        createdAt: '2023-06-20T12:00:00.000Z',
                        updatedAt: '2023-06-20T12:00:00.000Z',
                    },
                ],
                meta: {
                    total: 100,
                    page: 1,
                    limit: 10,
                    totalPages: 10,
                    hasNext: true,
                    hasPrevious: false,
                },
            },
        },
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized - Invalid or missing JWT token',
    })
    @ApiForbiddenResponse({
        description: 'Forbidden - Insufficient permissions',
    })
    async findAll(@Query() queryLeadsDto: QueryLeadsDto) {
        return this.leadsService.findAll(queryLeadsDto);
    }

    /**
     * Get statistics about submissions
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Get('stats')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPERADMIN', 'ADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Get statistics about submissions',
        description: 'Retrieves statistics about contact form submissions. This endpoint requires ADMIN or SUPERADMIN authentication.',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Statistics retrieved successfully',
        schema: {
            example: {
                total: 100,
                unread: 25,
                newToday: 5,
            },
        },
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized - Invalid or missing JWT token',
    })
    @ApiForbiddenResponse({
        description: 'Forbidden - Insufficient permissions',
    })
    async getStats() {
        return this.leadsService.getStats();
    }

    /**
     * Get a specific contact form submission
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPERADMIN', 'ADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Get a specific contact form submission',
        description: 'Retrieves a specific contact form submission by ID. This endpoint requires ADMIN or SUPERADMIN authentication.',
    })
    @ApiParam({
        name: 'id',
        description: 'The ID of the submission to retrieve',
        example: '60d21b4667d0d8992e610c85',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Submission retrieved successfully',
        schema: {
            example: {
                id: '60d21b4667d0d8992e610c85',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                contactNumber: '+91 98765 43210',
                personType: 'Student',
                interestedIn: 'Research Collaboration',
                message: 'I would like to inquire about your upcoming projects.',
                fileUrl: 'https://storage.example.com/uploads/file.pdf',
                links: 'https://example.com/myproject',
                isRead: false,
                isDeleted: false,
                createdAt: '2023-06-20T12:00:00.000Z',
                updatedAt: '2023-06-20T12:00:00.000Z',
            },
        },
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized - Invalid or missing JWT token',
    })
    @ApiForbiddenResponse({
        description: 'Forbidden - Insufficient permissions',
    })
    @ApiNotFoundResponse({
        description: 'Submission not found',
    })
    async findOne(@Param('id') id: string) {
        return this.leadsService.findOne(id);
    }

    /**
     * Mark a submission as read
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Patch(':id/mark-read')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPERADMIN', 'ADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Mark a submission as read',
        description: 'Marks a specific contact form submission as read. This endpoint requires ADMIN or SUPERADMIN authentication.',
    })
    @ApiParam({
        name: 'id',
        description: 'The ID of the submission to mark as read',
        example: '60d21b4667d0d8992e610c85',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Submission marked as read successfully',
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized - Invalid or missing JWT token',
    })
    @ApiForbiddenResponse({
        description: 'Forbidden - Insufficient permissions',
    })
    @ApiNotFoundResponse({
        description: 'Submission not found',
    })
    @HttpCode(HttpStatus.OK)
    async markAsRead(@Param('id') id: string) {
        return this.leadsService.markAsRead(id);
    }

    /**
     * Delete a contact form submission (soft delete)
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPERADMIN', 'ADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Delete a contact form submission',
        description: 'Soft deletes a specific contact form submission. This endpoint requires ADMIN or SUPERADMIN authentication.',
    })
    @ApiParam({
        name: 'id',
        description: 'The ID of the submission to delete',
        example: '60d21b4667d0d8992e610c85',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Submission deleted successfully',
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized - Invalid or missing JWT token',
    })
    @ApiForbiddenResponse({
        description: 'Forbidden - Insufficient permissions',
    })
    @ApiNotFoundResponse({
        description: 'Submission not found',
    })
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string) {
        return this.leadsService.remove(id);
    }

    /**
     * Upload a file for contact form submission
     * This endpoint is public and does not require authentication
     */
    @Post('upload-file')
    @ApiOperation({
        summary: 'Upload a file for contact form',
        description: 'Uploads an image or PDF file for contact form submission. This endpoint is public and does not require authentication.',
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'File to upload (image or PDF)',
                },
            },
            required: ['file'],
        },
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'File uploaded successfully',
        schema: {
            type: 'object',
            properties: {
                url: {
                    type: 'string',
                    example: '/assets/pdf/contact-attachment.pdf',
                },
                fileType: {
                    type: 'string',
                    example: 'pdf',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Multer.File) {
        if (!file) {
            throw new BadRequestException('No file provided');
        }

        // Check if it's a PDF or an image
        const isPdf = file.mimetype === 'application/pdf';
        const isImage = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.mimetype);

        if (!isPdf && !isImage) {
            throw new BadRequestException('Invalid file type. Only PDF or image files (JPEG, PNG, GIF, WebP) are allowed.');
        }

        let url: string;

        if (isPdf) {
            url = await this.fileUploadService.uploadPdf(file, `contact-attachment-${Date.now()}`);
        } else {
            url = await this.fileUploadService.uploadImage(file, `contact-attachment-${Date.now()}`);
        }

        return {
            url,
            fileType: isPdf ? 'pdf' : 'image'
        };
    }
}
