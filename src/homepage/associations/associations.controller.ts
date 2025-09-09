import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Query,
    Body,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    HttpCode,
    HttpStatus,
    BadRequestException,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiQuery,
    ApiBearerAuth,
    ApiConsumes,
    ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import { AssociationsService } from './associations.service';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { QueryAssociationDto } from './dto/query-association.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('Homepage')
@Controller('homepage/associations')
export class AssociationsController {
    constructor(private readonly service: AssociationsService) { }

    /**
     * Get all associations with pagination and filtering
     * This endpoint is public and does not require authentication
     */
    @Get()
    @ApiOperation({
        summary: 'Get all associations',
        description: 'Retrieves all associations with pagination and filtering. This endpoint is public and does not require authentication.',
    })
    @ApiQuery({
        name: 'page',
        required: false,
        description: 'Page number for pagination (default: 1)',
        type: Number,
        example: 1,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        description: 'Number of items per page (default: 10, max: 50)',
        type: Number,
        example: 10,
    })
    @ApiQuery({
        name: 'search',
        required: false,
        description: 'Search term to filter by title',
        type: String,
        example: 'partner',
    })
    @ApiQuery({
        name: 'active',
        required: false,
        description: 'Filter by active status',
        type: Boolean,
        example: true,
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Associations retrieved successfully',
        schema: {
            example: {
                data: [
                    {
                        id: '60d21b4667d0d8992e610c85',
                        title: 'Partner Organization',
                        imageUrl: '/assets/images/associations/partner-org.jpg',
                        order: 1,
                        active: true,
                        createdAt: '2023-06-10T12:00:00.000Z',
                        updatedAt: '2023-06-10T12:00:00.000Z',
                    },
                ],
                meta: {
                    total: 10,
                    page: 1,
                    limit: 10,
                    totalPages: 1,
                    hasNext: false,
                    hasPrevious: false,
                },
                lastUpdated: '2023-06-10T12:00:00.000Z',
            },
        },
    })
    async findAll(@Query() queryAssociationDto: QueryAssociationDto) {
        return this.service.findAll(queryAssociationDto);
    }

    /**
     * Get a specific association by ID
     * This endpoint is public and does not require authentication
     */
    @Get(':id')
    @ApiOperation({
        summary: 'Get a specific association',
        description: 'Retrieves a specific association by ID. This endpoint is public and does not require authentication.',
    })
    @ApiParam({
        name: 'id',
        description: 'The ID of the association to retrieve',
        example: '60d21b4667d0d8992e610c85',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Association retrieved successfully',
        schema: {
            example: {
                id: '60d21b4667d0d8992e610c85',
                title: 'Partner Organization',
                imageUrl: '/assets/images/associations/partner-org.jpg',
                order: 1,
                active: true,
                createdAt: '2023-06-10T12:00:00.000Z',
                updatedAt: '2023-06-10T12:00:00.000Z',
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Association not found',
    })
    async findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    /**
     * Create a new association with image upload
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN', 'SUPERADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Create a new association',
        description: 'Creates a new association with image upload. This endpoint requires ADMIN or SUPERADMIN authentication.',
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    example: 'Partner Organization',
                },
                order: {
                    type: 'integer',
                    example: 1,
                },
                active: {
                    type: 'boolean',
                    example: true,
                },
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'Image file to upload',
                },
            },
            required: ['title', 'file'],
        },
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Association created successfully',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Bad request',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
    })
    @ApiResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Forbidden',
    })
    @UseInterceptors(FileInterceptor('file'))
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() body: any,
        @UploadedFile() file: Multer.File,
    ) {
        // Parse form data properly
        const createAssociationDto: CreateAssociationDto = {
            title: body.title,
            // Parse order as number
            order: body.order ? parseInt(body.order, 10) : undefined,
            // Parse active as boolean
            active: body.active === 'true' || body.active === true,
        };

        if (!file) {
            throw new BadRequestException('Image file is required');
        }

        return this.service.create(createAssociationDto, file);
    }

    /**
     * Update an association
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN', 'SUPERADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Update an association',
        description: 'Updates an association by ID. This endpoint requires ADMIN or SUPERADMIN authentication.',
    })
    @ApiParam({
        name: 'id',
        description: 'The ID of the association to update',
        example: '60d21b4667d0d8992e610c85',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Association updated successfully',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Bad request',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
    })
    @ApiResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Forbidden',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Association not found',
    })
    async update(
        @Param('id') id: string,
        @Body() updateAssociationDto: UpdateAssociationDto,
    ) {
        return this.service.update(id, updateAssociationDto);
    }

    /**
     * Update association image
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Put(':id/image')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN', 'SUPERADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Update association image',
        description: 'Updates the image of an association by ID. This endpoint requires ADMIN or SUPERADMIN authentication.',
    })
    @ApiConsumes('multipart/form-data')
    @ApiParam({
        name: 'id',
        description: 'The ID of the association to update image for',
        example: '60d21b4667d0d8992e610c85',
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'New image file to upload',
                },
            },
            required: ['file'],
        },
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Association image updated successfully',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Bad request',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
    })
    @ApiResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Forbidden',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Association not found',
    })
    @UseInterceptors(FileInterceptor('file'))
    async updateImage(
        @Param('id') id: string,
        @UploadedFile() file: Multer.File,
    ) {
        if (!file) {
            throw new BadRequestException('Image file is required');
        }

        return this.service.updateImage(id, file);
    }

    /**
     * Toggle association active status
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Put(':id/toggle-status')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN', 'SUPERADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Toggle association status',
        description: 'Toggles the active status of an association. This endpoint requires ADMIN or SUPERADMIN authentication.',
    })
    @ApiParam({
        name: 'id',
        description: 'The ID of the association to toggle status',
        example: '60d21b4667d0d8992e610c85',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Association status toggled successfully',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
    })
    @ApiResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Forbidden',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Association not found',
    })
    async toggleStatus(@Param('id') id: string) {
        return this.service.toggleStatus(id);
    }

    /**
     * Delete an association
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN', 'SUPERADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Delete an association',
        description: 'Deletes an association by ID. This endpoint requires ADMIN or SUPERADMIN authentication.',
    })
    @ApiParam({
        name: 'id',
        description: 'The ID of the association to delete',
        example: '60d21b4667d0d8992e610c85',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Association deleted successfully',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
    })
    @ApiResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Forbidden',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Association not found',
    })
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
