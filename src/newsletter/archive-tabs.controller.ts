import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    HttpStatus,
    HttpCode,
    Query,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBearerAuth,
    ApiBody,
    ApiUnauthorizedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiQuery,
} from '@nestjs/swagger';
import { ArchiveTabsService } from './archive-tabs.service';
import { CreateArchiveTabDto } from './dto/create-archive-tab.dto';
import { UpdateArchiveTabDto } from './dto/update-archive-tab.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Archive Tabs')
@Controller('archives/tabs')
export class ArchiveTabsController {
    constructor(private readonly archiveTabsService: ArchiveTabsService) { }

    /**
     * Create a new archive tab
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPERADMIN', 'ADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Create a new archive tab',
        description: 'Creates a new archive tab. This endpoint requires ADMIN or SUPERADMIN authentication.',
    })
    @ApiBody({ type: CreateArchiveTabDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Archive tab created successfully',
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized - Invalid or missing JWT token',
    })
    @ApiForbiddenResponse({
        description: 'Forbidden - Insufficient permissions',
    })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createArchiveTabDto: CreateArchiveTabDto) {
        return this.archiveTabsService.create(createArchiveTabDto);
    }

    /**
     * Get all archive tabs
     * This endpoint is public and does not require authentication
     */
    @Get()
    @ApiOperation({
        summary: 'Get all archive tabs',
        description: 'Retrieves all archive tabs. This endpoint is public and does not require authentication.',
    })
    @ApiQuery({
        name: 'activeOnly',
        required: false,
        type: Boolean,
        description: 'If true, returns only active tabs',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Archive tabs retrieved successfully',
        schema: {
            example: [
                {
                    id: '60d21b4667d0d8992e610c85',
                    name: 'Newsletters',
                    slug: 'newsletters',
                    description: 'Archive of all published newsletters',
                    order: 1,
                    active: true,
                    createdAt: '2023-06-10T12:00:00.000Z',
                    updatedAt: '2023-06-10T12:00:00.000Z',
                },
                {
                    id: '60d21b4667d0d8992e610c86',
                    name: 'Reports',
                    slug: 'reports',
                    description: 'Archive of all published reports',
                    order: 2,
                    active: true,
                    createdAt: '2023-06-10T12:00:00.000Z',
                    updatedAt: '2023-06-10T12:00:00.000Z',
                },
            ],
        },
    })
    async findAll(@Query('activeOnly') activeOnly?: boolean) {
        return this.archiveTabsService.findAll(activeOnly === true);
    }

    /**
     * Get a specific archive tab by ID
     * This endpoint is public and does not require authentication
     */
    @Get(':id')
    @ApiOperation({
        summary: 'Get a specific archive tab by ID',
        description: 'Retrieves a specific archive tab by ID. This endpoint is public and does not require authentication.',
    })
    @ApiParam({
        name: 'id',
        description: 'The ID of the tab to retrieve',
        example: '60d21b4667d0d8992e610c85',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Archive tab retrieved successfully',
        schema: {
            example: {
                id: '60d21b4667d0d8992e610c85',
                name: 'Newsletters',
                slug: 'newsletters',
                description: 'Archive of all published newsletters',
                order: 1,
                active: true,
                createdAt: '2023-06-10T12:00:00.000Z',
                updatedAt: '2023-06-10T12:00:00.000Z',
            },
        },
    })
    @ApiNotFoundResponse({
        description: 'Archive tab not found',
    })
    async findOne(@Param('id') id: string) {
        return this.archiveTabsService.findOne(id);
    }

    /**
     * Get a specific archive tab by slug
     * This endpoint is public and does not require authentication
     */
    @Get('slug/:slug')
    @ApiOperation({
        summary: 'Get a specific archive tab by slug',
        description: 'Retrieves a specific archive tab by slug. This endpoint is public and does not require authentication.',
    })
    @ApiParam({
        name: 'slug',
        description: 'The slug of the tab to retrieve',
        example: 'newsletters',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Archive tab retrieved successfully',
        schema: {
            example: {
                id: '60d21b4667d0d8992e610c85',
                name: 'Newsletters',
                slug: 'newsletters',
                description: 'Archive of all published newsletters',
                order: 1,
                active: true,
                createdAt: '2023-06-10T12:00:00.000Z',
                updatedAt: '2023-06-10T12:00:00.000Z',
            },
        },
    })
    @ApiNotFoundResponse({
        description: 'Archive tab not found',
    })
    async findBySlug(@Param('slug') slug: string) {
        return this.archiveTabsService.findBySlug(slug);
    }

    /**
     * Update an archive tab
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPERADMIN', 'ADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Update an archive tab',
        description: 'Updates a specific archive tab. This endpoint requires ADMIN or SUPERADMIN authentication.',
    })
    @ApiParam({
        name: 'id',
        description: 'The ID of the tab to update',
        example: '60d21b4667d0d8992e610c85',
    })
    @ApiBody({ type: UpdateArchiveTabDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Archive tab updated successfully',
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized - Invalid or missing JWT token',
    })
    @ApiForbiddenResponse({
        description: 'Forbidden - Insufficient permissions',
    })
    @ApiNotFoundResponse({
        description: 'Archive tab not found',
    })
    async update(
        @Param('id') id: string,
        @Body() updateArchiveTabDto: UpdateArchiveTabDto,
    ) {
        return this.archiveTabsService.update(id, updateArchiveTabDto);
    }

    /**
     * Toggle archive tab active status
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Patch(':id/toggle-status')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPERADMIN', 'ADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Toggle archive tab active status',
        description: 'Toggles the active status of a specific archive tab. This endpoint requires ADMIN or SUPERADMIN authentication.',
    })
    @ApiParam({
        name: 'id',
        description: 'The ID of the tab to toggle',
        example: '60d21b4667d0d8992e610c85',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Archive tab status toggled successfully',
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized - Invalid or missing JWT token',
    })
    @ApiForbiddenResponse({
        description: 'Forbidden - Insufficient permissions',
    })
    @ApiNotFoundResponse({
        description: 'Archive tab not found',
    })
    async toggleStatus(@Param('id') id: string) {
        return this.archiveTabsService.toggleStatus(id);
    }

    /**
     * Delete an archive tab
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPERADMIN', 'ADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Delete an archive tab',
        description: 'Deletes a specific archive tab. This endpoint requires ADMIN or SUPERADMIN authentication.',
    })
    @ApiParam({
        name: 'id',
        description: 'The ID of the tab to delete',
        example: '60d21b4667d0d8992e610c85',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Archive tab deleted successfully',
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized - Invalid or missing JWT token',
    })
    @ApiForbiddenResponse({
        description: 'Forbidden - Insufficient permissions',
    })
    @ApiNotFoundResponse({
        description: 'Archive tab not found',
    })
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string) {
        return this.archiveTabsService.remove(id);
    }

    /**
     * Reorder archive tabs
     * This endpoint requires authentication (ADMIN or SUPERADMIN)
     */
    @Post('reorder')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPERADMIN', 'ADMIN')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Reorder archive tabs',
        description: 'Reorders archive tabs based on the provided array of tab IDs. This endpoint requires ADMIN or SUPERADMIN authentication.',
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                tabIds: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                    description: 'Array of tab IDs in the desired order',
                    example: ['60d21b4667d0d8992e610c86', '60d21b4667d0d8992e610c85'],
                },
            },
            required: ['tabIds'],
        },
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Archive tabs reordered successfully',
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized - Invalid or missing JWT token',
    })
    @ApiForbiddenResponse({
        description: 'Forbidden - Insufficient permissions',
    })
    @HttpCode(HttpStatus.OK)
    async reorder(@Body('tabIds') tabIds: string[]) {
        return this.archiveTabsService.reorder(tabIds);
    }
}
