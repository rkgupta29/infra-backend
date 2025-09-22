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
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import { NewsletterService } from './newsletter.service';
import { FileUploadService } from '../common/file-upload/file-upload.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { QueryNewslettersDto } from './dto/query-newsletters.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Newsletters')
@Controller('archives/newsletter')
export class NewsletterController {
  constructor(
    private readonly newsletterService: NewsletterService,
    private readonly fileUploadService: FileUploadService,
  ) { }

  /**
   * Create a new newsletter
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create a new newsletter',
    description: 'Creates a new newsletter with file uploads. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        coverImageFile: {
          type: 'string',
          format: 'binary',
          description: 'Cover image for the newsletter',
        },
        pdfFile: {
          type: 'string',
          format: 'binary',
          description: 'PDF file of the newsletter',
        },
        title: {
          type: 'string',
          description: 'The title of the newsletter (optional, defaults to empty string)',
        },
        subtitle: {
          type: 'string',
          description: 'The subtitle of the newsletter',
        },
        version: {
          type: 'string',
          description: 'The version of the newsletter (e.g., "Vol. 1, Issue 2")',
        },
        publishedDate: {
          type: 'string',
          description: 'The publication date of the newsletter (YYYY-MM-DD)',
        },
        active: {
          type: 'boolean',
          description: 'Whether the newsletter is active',
        },
      },
      required: ['version', 'publishedDate', 'coverImageFile', 'pdfFile'],
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Newsletter created successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions',
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'coverImageFile', maxCount: 1 },
      { name: 'pdfFile', maxCount: 1 },
    ])
  )
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: any,
    @UploadedFiles()
    files: {
      coverImageFile?: Multer.File[],
      pdfFile?: Multer.File[],
    },
  ) {
    // Parse form data properly
    const createNewsletterDto = {
      title: body.title,
      subtitle: body.subtitle,
      version: body.version,
      publishedDate: body.publishedDate,
      // These will be set by the service based on uploaded files
      coverImage: '',
      fileUrl: '',
      // Parse active as boolean if provided
      active: body.active === 'true' || body.active === true,
    } as CreateNewsletterDto;

    return this.newsletterService.create(createNewsletterDto, files);
  }

  /**
   * Get all newsletters with pagination
   * This endpoint is public and does not require authentication
   */
  @Get()
  @ApiOperation({
    summary: 'Get all newsletters',
    description: 'Retrieves all newsletters with pagination. This endpoint is public and does not require authentication.',
  })
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    description: 'If true, returns only active newsletters; if false, returns all newsletters regardless of active status (default: true)',
    type: Boolean,
    example: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Newsletters retrieved successfully',
    schema: {
      example: {
        data: [
          {
            id: '60d21b4667d0d8992e610c85',
            title: 'Infrastructure Insights',
            subtitle: 'Quarterly Review of Infrastructure Development',
            version: 'Vol. 1, Issue 2',
            publishedDate: '2023-06-15T00:00:00.000Z',
            coverImage: '/assets/images/newsletter-cover-june-2023.jpg',
            fileUrl: '/assets/pdf/newsletter-june-2023.pdf',
            active: true,
            createdAt: '2023-06-10T12:00:00.000Z',
            updatedAt: '2023-06-10T12:00:00.000Z',
          },
        ],
        meta: {
          total: 27,
          page: 1,
          limit: 10,
          totalPages: 3,
          hasNext: true,
          hasPrevious: false,
        },
      },
    },
  })
  async findAll(@Query() queryNewslettersDto: QueryNewslettersDto) {
    return this.newsletterService.findAll(queryNewslettersDto);
  }

  /**
   * Get the latest three newsletters
   * This endpoint is public and does not require authentication
   */
  @Get('recent')
  @ApiOperation({
    summary: 'Get the latest three newsletters',
    description: 'Retrieves the most recent three newsletters. This endpoint is public and does not require authentication.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Latest newsletters retrieved successfully',
    schema: {
      example: [
        {
          id: '60d21b4667d0d8992e610c85',
          title: 'Infrastructure Insights',
          subtitle: 'Quarterly Review of Infrastructure Development',
          version: 'Vol. 1, Issue 2',
          publishedDate: '2023-06-15T00:00:00.000Z',
          coverImage: '/assets/images/newsletter-cover-june-2023.jpg',
          fileUrl: '/assets/pdf/newsletter-june-2023.pdf',
          active: true,
          createdAt: '2023-06-10T12:00:00.000Z',
          updatedAt: '2023-06-10T12:00:00.000Z',
        },
        // ... up to three entries
      ],
    },
  })
  async getRecentNewsletters() {
    return this.newsletterService.getRecentNewsletters();
  }
  /**
   * Get all publication years
   * This endpoint is public and does not require authentication
   */
  @Get('years')
  @ApiOperation({
    summary: 'Get all publication years',
    description: 'Retrieves all years in which newsletters were published. This endpoint is public and does not require authentication.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Publication years retrieved successfully',
    schema: {
      example: [2023, 2022, 2021],
    },
  })
  async getPublicationYears() {
    return this.newsletterService.getPublicationYears();
  }

  /**
   * Get newsletters by publication year
   * This endpoint is public and does not require authentication
   */
  @Get('years/:year')
  @ApiOperation({
    summary: 'Get newsletters by publication year',
    description: 'Retrieves newsletters for a specific publication year. This endpoint is public and does not require authentication.',
  })
  @ApiParam({
    name: 'year',
    description: 'The year to filter by (YYYY format)',
    example: '2023',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Newsletters retrieved successfully',
  })
  @ApiNotFoundResponse({
    description: 'No newsletters found for the specified year',
  })
  async findByYear(
    @Param('year') year: string,
    @Query() queryNewslettersDto: QueryNewslettersDto,
  ) {
    return this.newsletterService.findByYear(year, queryNewslettersDto);
  }

  /**
   * Get a specific newsletter by ID
   * This endpoint is public and does not require authentication
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific newsletter',
    description: 'Retrieves a specific newsletter by ID. This endpoint is public and does not require authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the newsletter to retrieve',
    example: '60d21b4667d0d8992e610c85',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Newsletter retrieved successfully',
    schema: {
      example: {
        id: '60d21b4667d0d8992e610c85',
        title: 'Infrastructure Insights',
        subtitle: 'Quarterly Review of Infrastructure Development',
        version: 'Vol. 1, Issue 2',
        publishedDate: '2023-06-15T00:00:00.000Z',
        coverImage: '/assets/images/newsletter-cover-june-2023.jpg',
        fileUrl: '/assets/pdf/newsletter-june-2023.pdf',
        active: true,
        createdAt: '2023-06-10T12:00:00.000Z',
        updatedAt: '2023-06-10T12:00:00.000Z',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Newsletter not found',
  })
  async findOne(@Param('id') id: string) {
    return this.newsletterService.findOne(id);
  }

  /**
   * Update a newsletter
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update a newsletter',
    description: 'Updates a specific newsletter with optional file uploads. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'id',
    description: 'The ID of the newsletter to update',
    example: '60d21b4667d0d8992e610c85',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        coverImageFile: {
          type: 'string',
          format: 'binary',
          description: 'Cover image for the newsletter (optional)',
        },
        pdfFile: {
          type: 'string',
          format: 'binary',
          description: 'PDF file of the newsletter (optional)',
        },
        title: {
          type: 'string',
          description: 'The title of the newsletter (optional)',
        },
        subtitle: {
          type: 'string',
          description: 'The subtitle of the newsletter (optional)',
        },
        version: {
          type: 'string',
          description: 'The version of the newsletter (optional)',
        },
        publishedDate: {
          type: 'string',
          description: 'The publication date of the newsletter (optional)',
        },
        active: {
          type: 'boolean',
          description: 'Whether the newsletter is active (optional)',
        },
      },
      required: [],
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Newsletter updated successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions',
  })
  @ApiNotFoundResponse({
    description: 'Newsletter not found',
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'coverImageFile', maxCount: 1 },
      { name: 'pdfFile', maxCount: 1 },
    ])
  )
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFiles()
    files?: {
      coverImageFile?: Multer.File[],
      pdfFile?: Multer.File[],
    },
  ) {
    // Parse form data properly
    const updateNewsletterDto: UpdateNewsletterDto = {};

    if (body.title !== undefined) updateNewsletterDto.title = body.title;
    if (body.subtitle !== undefined) updateNewsletterDto.subtitle = body.subtitle;
    if (body.version !== undefined) updateNewsletterDto.version = body.version;
    if (body.publishedDate !== undefined) updateNewsletterDto.publishedDate = body.publishedDate;

    // Parse active as boolean if provided
    if (body.active !== undefined) {
      updateNewsletterDto.active = body.active === 'true' || body.active === true;
    }

    return this.newsletterService.update(id, updateNewsletterDto, files && (files.coverImageFile?.length || files.pdfFile?.length) ? files : undefined);
  }

  /**
   * Delete a newsletter
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete a newsletter',
    description: 'Deletes a specific newsletter. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the newsletter to delete',
    example: '60d21b4667d0d8992e610c85',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Newsletter deleted successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions',
  })
  @ApiNotFoundResponse({
    description: 'Newsletter not found',
  })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    return this.newsletterService.remove(id);
  }

  /**
   * Upload a PDF file for a newsletter
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Post('upload-pdf')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Upload a PDF file for a newsletter',
    description: 'Uploads a PDF file for a newsletter. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'PDF file to upload',
        },
        filename: {
          type: 'string',
          description: 'Optional custom filename (without extension)',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'PDF uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          example: '/assets/pdf/newsletter-june-2023.pdf',
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
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  async uploadPdf(
    @UploadedFile() file: Multer.File,
    @Body('filename') filename?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const url = await this.fileUploadService.uploadPdf(file, filename || `newsletter-${Date.now()}`);
    return { url };
  }

  /**
   * Upload a cover image for a newsletter
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Post('upload-image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Upload a cover image for a newsletter',
    description: 'Uploads a cover image for a newsletter. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file to upload (JPEG, PNG, GIF, WebP)',
        },
        filename: {
          type: 'string',
          description: 'Optional custom filename (without extension)',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Image uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          example: '/assets/images/newsletter-cover-june-2023.jpg',
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
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  async uploadImage(
    @UploadedFile() file: Multer.File,
    @Body('filename') filename?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const url = await this.fileUploadService.uploadImage(file, filename || `newsletter-cover-${Date.now()}`);
    return { url };
  }
}