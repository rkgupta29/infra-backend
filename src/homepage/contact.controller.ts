import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiParam,
    ApiUnauthorizedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiBadRequestResponse
} from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateSectionDto } from './dto/update-section.dto';

@ApiTags('Contact Page Content Management')
@Controller('content/contact')
export class ContactController {
    constructor(private readonly service: ContactService) { }

    /**
     * Get all contact sections
     * This endpoint is public and returns all active sections
     */
    @Get()
    @ApiOperation({
        summary: 'Get all contact sections',
        description: 'Retrieves all active contact sections. This endpoint is public and does not require authentication.'
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'All contact sections retrieved successfully',
        schema: {
            example: [
                {
                    sectionKey: 'contactInfo',
                    data: {
                        title: 'Contact Us',
                        subtitle: 'Get in touch with us',
                        description: 'We would love to hear from you. Reach out to us for any inquiries or collaborations.',
                        address: '123 Main Street, New Delhi, India',
                        email: 'contact@example.org',
                        phone: '+91 12345 67890'
                    }
                },
                {
                    sectionKey: 'contactForm',
                    data: {
                        title: 'Send us a message',
                        description: 'Fill out the form below and we will get back to you as soon as possible.',
                        fields: [
                            { name: 'name', label: 'Your Name', type: 'text', required: true },
                            { name: 'email', label: 'Email Address', type: 'email', required: true },
                            { name: 'message', label: 'Your Message', type: 'textarea', required: true }
                        ],
                        submitButtonText: 'Send Message'
                    }
                }
            ]
        }
    })
    async getAllSections() {
        return this.service.getAllSections();
    }

    /**
     * Get a specific contact section
     * This endpoint is public and returns the section data
     */
    @Get(':key')
    @ApiOperation({
        summary: 'Get a specific contact section',
        description: 'Retrieves a specific contact section by its key. This endpoint is public and does not require authentication.'
    })
    @ApiParam({
        name: 'key',
        description: 'The unique identifier for the section (e.g., contactInfo, contactForm, map)',
        example: 'contactInfo'
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Section retrieved successfully',
        schema: {
            example: {
                title: 'Contact Us',
                subtitle: 'Get in touch with us',
                description: 'We would love to hear from you. Reach out to us for any inquiries or collaborations.',
                address: '123 Main Street, New Delhi, India',
                email: 'contact@example.org',
                phone: '+91 12345 67890'
            }
        }
    })
    @ApiNotFoundResponse({
        description: 'Section not found'
    })
    async getSection(@Param('key') key: string) {
        const section = await this.service.getSection(key);
        return section.data;
    }

    /**
     * Create a new contact section
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPERADMIN', 'ADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Create a new contact section',
        description: 'Adds a new contact section. This endpoint requires ADMIN or SUPERADMIN authentication.'
    })
    @ApiBody({
        schema: {
            example: {
                sectionKey: 'newContactSection',
                data: {
                    title: 'New Contact Section',
                    description: 'Description for the new contact section',
                    // ...other fields as needed
                }
            }
        },
        description: 'The sectionKey and data object for the new section'
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Section created successfully'
    })
    @ApiBadRequestResponse({
        description: 'Bad Request - Invalid data format or sectionKey already exists'
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized - Invalid or missing JWT token'
    })
    @ApiForbiddenResponse({
        description: 'Forbidden - Insufficient permissions'
    })
    @HttpCode(HttpStatus.CREATED)
    async createSection(
        @Body() body: { sectionKey: string; data: Record<string, any> }
    ) {
        return this.service.createSection(body.sectionKey, body.data);
    }

    /**
     * Get all contact section keys
     * This endpoint is public and returns all section keys for the contact page
     */
    @Get('/keys/list')
    @ApiOperation({
        summary: 'Get all contact section keys',
        description: 'Returns an array of all section keys for the contact page. This endpoint is public.'
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'All contact section keys retrieved successfully',
        schema: {
            example: ['contactInfo', 'contactForm', 'map']
        }
    })
    async getContactSectionKeys() {
        return this.service.getContactSectionKeys();
    }

    /**
     * Update a contact section completely
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Patch(':key')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPERADMIN', 'ADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Update a contact section completely',
        description: 'Updates a contact section with completely new data. This endpoint requires ADMIN or SUPERADMIN authentication.'
    })
    @ApiParam({
        name: 'key',
        description: 'The unique identifier for the section to update',
        example: 'contactInfo'
    })
    @ApiBody({
        type: UpdateSectionDto,
        description: 'The complete data object for the section'
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Section updated successfully'
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized - Invalid or missing JWT token'
    })
    @ApiForbiddenResponse({
        description: 'Forbidden - Insufficient permissions'
    })
    @ApiBadRequestResponse({
        description: 'Bad Request - Invalid data format'
    })
    @HttpCode(HttpStatus.OK)
    async updateSection(@Param('key') key: string, @Body() dto: UpdateSectionDto) {
        return this.service.updateSection(key, dto.data);
    }

    /**
     * Toggle section active status
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Patch(':key/toggle-status')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPERADMIN', 'ADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Toggle section active status',
        description: 'Toggles the active status of a contact section. This endpoint requires ADMIN or SUPERADMIN authentication.'
    })
    @ApiParam({
        name: 'key',
        description: 'The unique identifier for the section to toggle',
        example: 'contactInfo'
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Section status toggled successfully'
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized - Invalid or missing JWT token'
    })
    @ApiForbiddenResponse({
        description: 'Forbidden - Insufficient permissions'
    })
    @ApiNotFoundResponse({
        description: 'Section not found'
    })
    @HttpCode(HttpStatus.OK)
    async toggleSectionStatus(@Param('key') key: string) {
        return this.service.toggleSectionStatus(key);
    }

    /**
     * Delete a contact section
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Delete(':key')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPERADMIN', 'ADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Delete a contact section',
        description: 'Permanently deletes a contact section. This action cannot be undone. This endpoint requires ADMIN or SUPERADMIN authentication.'
    })
    @ApiParam({
        name: 'key',
        description: 'The unique identifier for the section to delete',
        example: 'contactInfo'
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Section deleted successfully'
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized - Invalid or missing JWT token'
    })
    @ApiForbiddenResponse({
        description: 'Forbidden - Insufficient permissions'
    })
    @ApiNotFoundResponse({
        description: 'Section not found'
    })
    @HttpCode(HttpStatus.OK)
    async deleteSection(@Param('key') key: string) {
        return this.service.deleteSection(key);
    }

    @Post('/seed')
    @ApiOperation({
        summary: 'Seed the contact page with default sections',
        description: 'Seeds the contact page with default sections. This endpoint requires ADMIN or SUPERADMIN authentication.'
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Contact page seeded successfully'
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized - Invalid or missing JWT token'
    })
    @ApiForbiddenResponse({
        description: 'Forbidden - Insufficient permissions'
    })
    @HttpCode(HttpStatus.OK)
    async seedContact() {
        return this.service.seedContactContent();
    }
}
