import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles, UserRole } from '../../auth/decorators/roles.decorator';

@ApiTags('Knowledge')
@Controller('knowledge/blogs')
export class BlogsController {
  constructor(private readonly service: BlogsService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create a new blog',
    description: 'Creates a new blog with file uploads. Requires admin privileges.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        coverImageFile: {
          type: 'string',
          format: 'binary',
          description: 'Cover image for the blog',
        },
        docFile: {
          type: 'string',
          format: 'binary',
          description: 'PDF document file for the blog',
        },
        title: {
          type: 'string',
          description: 'The title of the blog',
        },
        subtitle: {
          type: 'string',
          description: 'The subtitle of the blog',
        },
        authorName: {
          type: 'string',
          description: 'The name of the author',
        },
        authorDesignation: {
          type: 'string',
          description: 'The designation/title of the author',
        },
        publishedDate: {
          type: 'string',
          description: 'The publication date of the blog (YYYY-MM-DD)',
        },
        content: {
          type: 'string',
          description: 'The markdown content of the blog',
        },
        active: {
          type: 'boolean',
          description: 'Whether the blog is active',
        },
        sectorIds: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Array of sector IDs associated with this blog',
        },
      },
      // All fields are optional
      required: [],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The blog has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'coverImageFile', maxCount: 1 },
      { name: 'docFile', maxCount: 1 },
    ])
  )
  create(
    @Body() body: any,
    @UploadedFiles()
    files: {
      coverImageFile?: Multer.File[],
      docFile?: Multer.File[],
    },
  ) {
    // Parse form data properly
    const createBlogDto: CreateBlogDto = {
      title: body.title,
      subtitle: body.subtitle,
      authorName: body.authorName,
      authorDesignation: body.authorDesignation,
      publishedDate: body.publishedDate,
      content: body.content,
      // Parse active as boolean
      active: body.active === 'true' || body.active === true,
      // Parse sectorIds as array
      sectorIds: Array.isArray(body.sectorIds)
        ? body.sectorIds
        : body.sectorIds?.includes(',')
          ? body.sectorIds.split(',')
          : [body.sectorIds]
    };

    return this.service.create(createBlogDto, files);
  }

  @Get('years')
  @ApiOperation({
    summary: 'Get years with blog publications',
    description: 'Retrieves an array of years in which blogs were published, sorted in descending order. This endpoint is public.',
  })
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    type: Boolean,
    description: 'If true, returns only years with active blogs',
    default: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Years retrieved successfully.',
    schema: {
      example: [2023, 2022, 2021, 2020],
    },
  })
  getBlogYears(@Query('activeOnly') activeOnly?: boolean) {
    return this.service.getBlogYears(activeOnly !== false);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all blogs',
    description: 'Retrieves a list of all blogs. This endpoint is public.',
  })
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    type: Boolean,
    description: 'If true, returns only active blogs',
  })
  @ApiQuery({
    name: 'sectorId',
    required: false,
    type: String,
    description: 'Filter blogs by sector ID',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (starts from 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'List of blogs retrieved successfully.',
  })
  findAll(
    @Query('activeOnly') activeOnly?: boolean,
    @Query('sectorId') sectorId?: string,
    @Query() paginationDto?: PaginationDto,
  ) {
    const { page = 1, limit = 10 } = paginationDto || {};

    // If sectorId is provided, use getBlogsBySector instead of findAll
    if (sectorId) {
      return this.service.getBlogsBySector(sectorId, activeOnly === true, page, limit);
    }

    return this.service.findAll(activeOnly === true, page, limit);
  }

  @Get('by-sector/:sectorId')
  @ApiOperation({
    summary: 'Get blogs by sector',
    description: 'Retrieves blogs filtered by sector ID. This endpoint is public.',
  })
  @ApiParam({
    name: 'sectorId',
    description: 'The ID of the sector to filter by',
  })
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    type: Boolean,
    description: 'If true, returns only active blogs',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (starts from 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Blogs retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Sector not found.' })
  getBlogsBySector(
    @Param('sectorId') sectorId: string,
    @Query('activeOnly') activeOnly?: boolean,
    @Query() paginationDto?: PaginationDto,
  ) {
    const { page = 1, limit = 10 } = paginationDto || {};
    return this.service.getBlogsBySector(sectorId, activeOnly === true, page, limit);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a blog by ID',
    description: 'Retrieves a specific blog by its ID. This endpoint is public.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the blog to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Blog retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update a blog',
    description: 'Updates a specific blog by its ID. Requires admin privileges.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the blog to update',
  })
  @ApiResponse({
    status: 200,
    description: 'Blog updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.service.update(id, updateBlogDto);
  }

  @Patch(':id/files')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update blog files',
    description: 'Updates the files (cover image and/or document) of a specific blog. Requires admin privileges.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'id',
    description: 'The ID of the blog to update files for',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        coverImageFile: {
          type: 'string',
          format: 'binary',
          description: 'New cover image for the blog',
        },
        docFile: {
          type: 'string',
          format: 'binary',
          description: 'New PDF document file for the blog',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Blog files updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'coverImageFile', maxCount: 1 },
      { name: 'docFile', maxCount: 1 },
    ])
  )
  updateFiles(
    @Param('id') id: string,
    @UploadedFiles()
    files: {
      coverImageFile?: Multer.File[],
      docFile?: Multer.File[],
    },
  ) {
    return this.service.updateFiles(id, files);
  }

  @Patch(':id/toggle-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Toggle blog status',
    description: 'Toggles the active status of a specific blog. Requires admin privileges.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the blog to toggle status',
  })
  @ApiResponse({
    status: 200,
    description: 'Blog status toggled successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  toggleStatus(@Param('id') id: string) {
    return this.service.toggleStatus(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete a blog',
    description: 'Deletes a specific blog by its ID. Requires admin privileges.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the blog to delete',
  })
  @ApiResponse({
    status: 204,
    description: 'Blog deleted successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
