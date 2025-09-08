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
  BadRequestException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
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
    description: 'Creates a new newsletter. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiBody({ type: CreateNewsletterDto })
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
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createNewsletterDto: CreateNewsletterDto) {
    return this.newsletterService.create(createNewsletterDto);
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
    description: 'Updates a specific newsletter. This endpoint requires ADMIN or SUPERADMIN authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the newsletter to update',
    example: '60d21b4667d0d8992e610c85',
  })
  @ApiBody({ type: UpdateNewsletterDto })
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
  async update(
    @Param('id') id: string,
    @Body() updateNewsletterDto: UpdateNewsletterDto,
  ) {
    return this.newsletterService.update(id, updateNewsletterDto);
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