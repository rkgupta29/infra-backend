import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileUploadService } from '../common/file-upload/file-upload.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { QueryNewslettersDto, SortOrder } from './dto/query-newsletters.dto';
import type { Multer } from 'multer';

@Injectable()
export class NewsletterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploadService: FileUploadService,
  ) { }

  /**
   * Create a new newsletter
   * @param createNewsletterDto - The data for the new newsletter
   * @param files - Uploaded files (cover image and PDF)
   * @returns The created newsletter
   */
  async create(
    createNewsletterDto: CreateNewsletterDto,
    files?: {
      coverImageFile?: Multer.File[],
      pdfFile?: Multer.File[],
    },
  ) {
    try {
      // Convert publishedDate from string to Date
      const publishedDate = new Date(createNewsletterDto.publishedDate);

      // Initialize variables for file URLs
      let coverImageUrl: string | undefined;
      let fileUrl: string | undefined;

      // Handle file uploads if provided
      if (files) {
        // Validate files
        if (!files.coverImageFile || files.coverImageFile.length === 0) {
          throw new BadRequestException('Cover image file is required');
        }

        if (!files.pdfFile || files.pdfFile.length === 0) {
          throw new BadRequestException('PDF file is required');
        }

        const coverImageFile = files.coverImageFile[0];
        const pdfFile = files.pdfFile[0];

        // Generate unique filenames with timestamp and hash
        const timestamp = Date.now();
        const imageHash = Math.random().toString(36).substring(2, 10);
        const pdfHash = Math.random().toString(36).substring(2, 10);

        // Create a base name for files
        const baseName = createNewsletterDto.title
          ? createNewsletterDto.title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .substring(0, 30) // Shorter title to accommodate hash
          : `newsletter-${timestamp}`;

        // Upload files
        coverImageUrl = await this.fileUploadService.uploadImage(
          coverImageFile,
          `newsletter-cover-${baseName}-${timestamp}-${imageHash}`
        );

        fileUrl = await this.fileUploadService.uploadPdf(
          pdfFile,
          `newsletter-pdf-${baseName}-${timestamp}-${pdfHash}`
        );
      }

      // Validate required fields
      if (!coverImageUrl) {
        throw new BadRequestException('Cover image is required');
      }

      if (!fileUrl) {
        throw new BadRequestException('PDF file is required');
      }

      // Ensure title is always a string (assign empty string if not provided)
      const title = createNewsletterDto.title && createNewsletterDto.title.trim() !== ''
        ? createNewsletterDto.title
        : '';

      return this.prisma.newsletter.create({
        data: {
          ...createNewsletterDto,
          title, // Use the guaranteed string value
          publishedDate,
          coverImage: coverImageUrl,
          fileUrl: fileUrl,
          active: createNewsletterDto.active !== undefined ? createNewsletterDto.active : true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all newsletters with pagination and filtering
   * @param queryNewslettersDto - Query parameters for filtering and pagination
   * @returns Paginated list of newsletters
   */
  async findAll(queryNewslettersDto: QueryNewslettersDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'publishedDate',
      sortOrder = SortOrder.DESC,
      search,
      year,
      activeOnly = true,
    } = queryNewslettersDto;

    const skip = (page - 1) * limit;

    // Build the filter object
    const where: any = {};

    // Add active filter if activeOnly is true
    if (activeOnly) {
      where.active = true;
    }

    // Add search filter if provided
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { subtitle: { contains: search, mode: 'insensitive' } },
        { version: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Add year filter if provided
    if (year) {
      // Filter by year using date range
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

      where.publishedDate = {
        gte: startDate,
        lte: endDate,
      };
    }

    // Get total count for pagination
    const total = await this.prisma.newsletter.count({ where });

    // Get the newsletters
    const newsletters = await this.prisma.newsletter.findMany({
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
      data: newsletters,
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
   * Get all publication years for newsletters
   * @returns Array of years in which newsletters were published
   */
  async getPublicationYears(): Promise<number[]> {
    // Get all newsletters
    const newsletters = await this.prisma.newsletter.findMany({
      where: { active: true },
      select: { publishedDate: true },
      orderBy: { publishedDate: 'desc' },
    });

    // Extract years and remove duplicates
    const years = newsletters.map(newsletter => new Date(newsletter.publishedDate).getFullYear());
    const uniqueYears = [...new Set(years)];

    return uniqueYears.sort((a: number, b: number) => b - a) as number[]; // Sort in descending order
  }

  /**
   * Get newsletters by publication year
   * @param year - The year to filter by
   * @param queryNewslettersDto - Query parameters for pagination
   * @returns Paginated list of newsletters for the specified year
   */
  async findByYear(year: string, queryNewslettersDto: QueryNewslettersDto) {
    // Validate year format
    if (!/^\d{4}$/.test(year)) {
      throw new BadRequestException('Year must be in YYYY format');
    }

    // Set year filter and call findAll
    return this.findAll({
      ...queryNewslettersDto,
      year,
    });
  }

  /**
   * Get a specific newsletter by ID
   * @param id - The ID of the newsletter to retrieve
   * @returns The newsletter data
   */
  async findOne(id: string) {
    const newsletter = await this.prisma.newsletter.findUnique({
      where: { id },
    });

    if (!newsletter) {
      throw new NotFoundException(`Newsletter with ID ${id} not found`);
    }

    return newsletter;
  }

  /**
   * Update a newsletter
   * @param id - The ID of the newsletter to update
   * @param updateNewsletterDto - The data to update
   * @param files - Optional uploaded files (cover image and PDF)
   * @returns The updated newsletter
   */
  async update(
    id: string,
    updateNewsletterDto: UpdateNewsletterDto,
    files?: {
      coverImageFile?: Multer.File[],
      pdfFile?: Multer.File[],
    },
  ) {
    try {
      // Check if newsletter exists
      const existingNewsletter = await this.findOne(id);

      // Prepare data for update
      const data: any = { ...updateNewsletterDto };

      if (updateNewsletterDto.publishedDate) {
        data.publishedDate = new Date(updateNewsletterDto.publishedDate);
      }

      // Preserve existing active status if not provided in the update
      if (data.active === undefined) {
        data.active = existingNewsletter.active;
      }
      // Remove publishedDate from data if it's empty or falsy to avoid errors
      if (!updateNewsletterDto.publishedDate) {
        delete data.publishedDate;
      }
      if (!updateNewsletterDto.title) {
        delete data.title;
      }
      if (!updateNewsletterDto.subtitle) {
        delete data.subtitle;
      }
      if (!updateNewsletterDto.version) {
        delete data.version;
      }
      if (!updateNewsletterDto.fileUrl) {
        delete data.fileUrl;
      }

      // Handle file uploads if provided
      if (files) {
        // Handle cover image file if provided
        if (files.coverImageFile && files.coverImageFile.length > 0) {
          const coverImageFile = files.coverImageFile[0];

          // Generate unique filename with timestamp and hash
          const timestamp = Date.now();
          const imageHash = Math.random().toString(36).substring(2, 10);

          // Use existing title or ID for filename
          const baseName = existingNewsletter.title
            ? existingNewsletter.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').substring(0, 30)
            : `newsletter-${id}`;

          // Upload image file
          const coverImageUrl = await this.fileUploadService.uploadImage(
            coverImageFile,
            `newsletter-cover-${baseName}-${timestamp}-${imageHash}`
          );

          // Delete old image if exists
          if (existingNewsletter.coverImage) {
            await this.fileUploadService.deleteFile(existingNewsletter.coverImage);
          }

          // Add image URL to update data
          data.coverImage = coverImageUrl;
        }

        // Handle PDF file if provided
        if (files.pdfFile && files.pdfFile.length > 0) {
          const pdfFile = files.pdfFile[0];

          // Generate unique filename with timestamp and hash
          const timestamp = Date.now();
          const pdfHash = Math.random().toString(36).substring(2, 10);

          // Use existing title or ID for filename
          const baseName = existingNewsletter.title
            ? existingNewsletter.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').substring(0, 30)
            : `newsletter-${id}`;

          // Upload PDF file
          const fileUrl = await this.fileUploadService.uploadPdf(
            pdfFile,
            `newsletter-pdf-${baseName}-${timestamp}-${pdfHash}`
          );

          // Delete old PDF if exists
          if (existingNewsletter.fileUrl) {
            await this.fileUploadService.deleteFile(existingNewsletter.fileUrl);
          }

          // Add PDF URL to update data
          data.fileUrl = fileUrl;
        }
      }

      return this.prisma.newsletter.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a newsletter
   * @param id - The ID of the newsletter to delete
   * @returns The deleted newsletter
   */
  async remove(id: string) {
    // Check if newsletter exists
    await this.findOne(id);

    return this.prisma.newsletter.delete({
      where: { id },
    });
  }

  /**
   * Get the latest three newsletters
   * @returns The latest three newsletters
   */
  async getRecentNewsletters() {
    return this.prisma.newsletter.findMany({
      where: { active: true },
      orderBy: { publishedDate: 'desc' },
      select: {
        id: true,
        title: true,
        subtitle: true,
        version: true,
        publishedDate: true,
        coverImage: true,
        fileUrl: true,
      },
      take: 3,
    });
  }
}