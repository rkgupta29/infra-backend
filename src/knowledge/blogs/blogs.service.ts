import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FileUploadService } from '../../common/file-upload/file-upload.service';
import { SectorsService } from '../sectors/sectors.service';
import type { Multer } from 'multer';

// Note: This is a temporary workaround until the Prisma client is regenerated
// after adding the Blog model to the schema
interface ExtendedPrismaService extends PrismaService {
  blog: any;
}

@Injectable()
export class BlogsService {
  private readonly logger = new Logger(BlogsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploadService: FileUploadService,
    private readonly sectorsService: SectorsService,
  ) { }

  /**
   * Create a new blog
   * @param createBlogDto - Data for the new blog
   * @param files - Uploaded files (cover image and document)
   * @returns The created blog
   */
  async create(
    createBlogDto: CreateBlogDto,
    files: {
      coverImageFile?: Multer.File[],
      docFile?: Multer.File[],
    },
  ) {
    try {
      // Handle sectors if provided
      let sectorIds: string[] = [];

      if (createBlogDto.sectorIds) {
        sectorIds = Array.isArray(createBlogDto.sectorIds)
          ? createBlogDto.sectorIds
          : [createBlogDto.sectorIds].filter(Boolean);

        // Validate sectors if provided
        if (sectorIds.length > 0) {
          await this.sectorsService.validateSectorIds(sectorIds);
        }
      }

      // Initialize variables for file URLs
      let coverImageUrl: string | undefined;
      let docFileUrl: string | undefined;

      // Handle cover image file if provided
      if (files.coverImageFile && files.coverImageFile.length > 0) {
        const coverImageFile = files.coverImageFile[0];
        // Generate filename later
      }

      // Handle document file if provided
      if (files.docFile && files.docFile.length > 0) {
        const docFile = files.docFile[0];
        // Generate filename later
      }

      // Generate unique filenames with timestamp and hash
      const timestamp = Date.now();
      const imageHash = Math.random().toString(36).substring(2, 10);
      const docHash = Math.random().toString(36).substring(2, 10);

      // Create a base name for files (use title if available, otherwise timestamp)
      const baseName = createBlogDto.title
        ? createBlogDto.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30) // Shorter title to accommodate hash
        : `blog-${timestamp}`;

      // Upload files if provided
      if (files.coverImageFile && files.coverImageFile.length > 0) {
        const coverImageFile = files.coverImageFile[0];
        coverImageUrl = await this.fileUploadService.uploadImage(
          coverImageFile,
          `blog-img-${baseName}-${timestamp}-${imageHash}`
        );
      }

      if (files.docFile && files.docFile.length > 0) {
        const docFile = files.docFile[0];
        docFileUrl = await this.fileUploadService.uploadPdf(
          docFile,
          `blog-doc-${baseName}-${timestamp}-${docHash}`
        );
      }

      // Parse date string to Date object if provided, otherwise use current date
      const publishedDate = createBlogDto.publishedDate
        ? new Date(createBlogDto.publishedDate)
        : new Date();

      // Prepare data for creating blog
      const blogData: any = {
        publishedDate,
        active: createBlogDto.active !== undefined ? createBlogDto.active : true,
        sectorIds,
      };

      // Add optional fields if provided
      if (createBlogDto.title) blogData.title = createBlogDto.title;
      if (createBlogDto.subtitle) blogData.subtitle = createBlogDto.subtitle;
      if (createBlogDto.authorName) blogData.authorName = createBlogDto.authorName;
      if (createBlogDto.authorDesignation) blogData.authorDesignation = createBlogDto.authorDesignation;
      if (createBlogDto.content) blogData.content = createBlogDto.content;
      if (coverImageUrl) blogData.coverImage = coverImageUrl;
      if (docFileUrl) blogData.docFile = docFileUrl;

      // Create blog with file URLs
      const blog = await (this.prisma as ExtendedPrismaService).blog.create({
        data: blogData,
        include: {
          sectors: true, // Include related sectors
        },
      });

      this.logger.log(`Created new blog: ${createBlogDto.title}`);
      return blog;
    } catch (error) {
      this.logger.error(`Failed to create blog: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get all blogs
   * @param activeOnly - If true, returns only active blogs
   * @param page - Page number (starts from 1)
   * @param limit - Number of items per page
   * @returns Array of all blogs with pagination
   */
  async findAll(activeOnly = false, page = 1, limit = 10) {
    const where: any = {};

    // Filter by active status if requested
    if (activeOnly) {
      where.active = true;
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await (this.prisma as ExtendedPrismaService).blog.count({
      where,
    });

    // Get paginated blogs
    const blogs = await (this.prisma as ExtendedPrismaService).blog.findMany({
      where,
      orderBy: { publishedDate: 'desc' },
      include: {
        sectors: true, // Include related sectors
      },
      skip,
      take: limit,
    });

    return {
      blogs,
      pagination: {
        totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Get a specific blog by ID
   * @param id - The ID of the blog to find
   * @returns The found blog or throws 404 if not found
   */
  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('Blog ID must be provided');
    }

    const blog = await (this.prisma as ExtendedPrismaService).blog.findUnique({
      where: { id },
      include: {
        sectors: true, // Include related sectors
      },
    });

    if (!blog) {
      throw new NotFoundException(`Blog with ID '${id}' not found`);
    }

    return blog;
  }

  /**
   * Update a blog
   * @param id - The ID of the blog to modify
   * @param updateBlogDto - The data to update
   * @returns The updated blog
   */
  async update(id: string, updateBlogDto: UpdateBlogDto) {
    // Verify blog exists
    await this.findOne(id);

    // Parse date string to Date object if provided
    const data: any = { ...updateBlogDto };
    if (updateBlogDto.publishedDate) {
      data.publishedDate = new Date(updateBlogDto.publishedDate);
    }

    // Validate sectors if provided
    if (updateBlogDto.sectorIds && updateBlogDto.sectorIds.length > 0) {
      await this.sectorsService.validateSectorIds(updateBlogDto.sectorIds);
    }

    return (this.prisma as ExtendedPrismaService).blog.update({
      where: { id },
      data,
      include: {
        sectors: true, // Include related sectors
      },
    });
  }

  /**
   * Update blog files
   * @param id - The ID of the blog to update files for
   * @param files - The new files to upload
   * @returns The updated blog
   */
  async updateFiles(
    id: string,
    files: {
      coverImageFile?: Multer.File[],
      docFile?: Multer.File[],
    },
  ) {
    // Verify blog exists and get current data
    const blog = await this.findOne(id);
    const updateData: any = {};

    try {
      // Update cover image if provided
      if (files.coverImageFile && files.coverImageFile.length > 0) {
        const coverImageFile = files.coverImageFile[0];
        const timestamp = Date.now();
        const imageHash = Math.random().toString(36).substring(2, 10);
        const sanitizedTitle = blog.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30);

        const coverImageUrl = await this.fileUploadService.uploadImage(
          coverImageFile,
          `blog-img-${sanitizedTitle}-${timestamp}-${imageHash}`
        );

        // Delete old image if exists
        if (blog.coverImage) {
          await this.fileUploadService.deleteFile(blog.coverImage);
        }

        updateData.coverImage = coverImageUrl;
      }

      // Update doc file if provided
      if (files.docFile && files.docFile.length > 0) {
        const docFile = files.docFile[0];
        const timestamp = Date.now();
        const docHash = Math.random().toString(36).substring(2, 10);
        const sanitizedTitle = blog.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30);

        const docFileUrl = await this.fileUploadService.uploadPdf(
          docFile,
          `blog-doc-${sanitizedTitle}-${timestamp}-${docHash}`
        );

        // Delete old doc if exists
        if (blog.docFile) {
          await this.fileUploadService.deleteFile(blog.docFile);
        }

        updateData.docFile = docFileUrl;
      }

      // Update blog with new file URLs if any files were uploaded
      if (Object.keys(updateData).length > 0) {
        return (this.prisma as ExtendedPrismaService).blog.update({
          where: { id },
          data: updateData,
          include: {
            sectors: true, // Include related sectors
          },
        });
      }

      // If no files were uploaded, return the existing blog
      return blog;
    } catch (error) {
      this.logger.error(`Failed to update blog files: ${error.message}`);
      throw error;
    }
  }

  /**
   * Toggle the active status of a blog
   * @param id - The ID of the blog to toggle
   * @returns The updated blog
   */
  async toggleStatus(id: string) {
    const blog = await this.findOne(id);

    return (this.prisma as ExtendedPrismaService).blog.update({
      where: { id },
      data: {
        active: !blog.active,
      },
      include: {
        sectors: true, // Include related sectors
      },
    });
  }

  /**
   * Delete a blog
   * @param id - The ID of the blog to delete
   * @returns The deleted blog
   */
  async remove(id: string) {
    const blog = await this.findOne(id); // Verify it exists

    try {
      // Delete associated files
      if (blog.coverImage) {
        await this.fileUploadService.deleteFile(blog.coverImage);
      }

      if (blog.docFile) {
        await this.fileUploadService.deleteFile(blog.docFile);
      }

      // Delete the blog record
      return (this.prisma as ExtendedPrismaService).blog.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to delete blog: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get blogs by sector
   * @param sectorId - The ID of the sector to filter by
   * @param activeOnly - If true, returns only active blogs
   * @param page - Page number (starts from 1)
   * @param limit - Number of items per page
   * @returns Array of blogs in the specified sector with pagination
   */
  async getBlogsBySector(sectorId: string, activeOnly = false, page = 1, limit = 10) {
    // Verify sector exists
    await this.sectorsService.findOne(sectorId);

    const where: any = {
      sectorIds: {
        has: sectorId,
      },
    };

    // Filter by active status if requested
    if (activeOnly) {
      where.active = true;
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await (this.prisma as ExtendedPrismaService).blog.count({
      where,
    });

    // Get paginated blogs
    const blogs = await (this.prisma as ExtendedPrismaService).blog.findMany({
      where,
      orderBy: { publishedDate: 'desc' },
      include: {
        sectors: true, // Include related sectors
      },
      skip,
      take: limit,
    });

    return {
      blogs,
      pagination: {
        totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Get years with blog publications
   * @param activeOnly - If true, returns only years with active blogs
   * @returns Array of years in which blogs were published, sorted in descending order
   */
  async getBlogYears(activeOnly = true): Promise<number[]> {
    try {
      const where = activeOnly ? { active: true } : {};

      // Extract years from publishedDate
      const result = await (this.prisma as ExtendedPrismaService).blog.findMany({
        where,
        select: {
          publishedDate: true,
        },
      });

      // Extract years from dates and remove duplicates
      const years = result
        .map(blog => new Date(blog.publishedDate).getFullYear())
        .filter((year, index, self) => self.indexOf(year) === index)
        .sort((a, b) => b - a); // Sort in descending order

      return years;
    } catch (error) {
      this.logger.error(`Failed to fetch blog years: ${error.message}`);
      throw error;
    }
  }
}
