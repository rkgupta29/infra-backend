import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { CategoriesService } from '../categories/categories.service';
import { FileUploadService } from '../../common/file-upload/file-upload.service';
import type { Multer } from 'multer';

// Note: This is a temporary workaround until the Prisma client is regenerated
// after adding the Video model to the schema
interface ExtendedPrismaService extends PrismaService {
  video: any;
}

@Injectable()
export class VideosService {
  private readonly logger = new Logger(VideosService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly categoriesService: CategoriesService,
    private readonly fileUploadService: FileUploadService,
  ) { }

  /**
   * Create a new video
   * @param createVideoDto - Data for the new video
   * @param imageFile - Optional image file
   * @returns The created video
   */
  async create(createVideoDto: CreateVideoDto, imageFile?: Multer.File) {
    try {
      // Validate that all categories exist
      await this.categoriesService.validateCategoryIds(createVideoDto.categoryIds);

      let imageUrl = '';

      // Handle image upload if provided
      if (imageFile) {
        const timestamp = Date.now();
        const randomHash = Math.random().toString(36).substring(2, 10);
        const sanitizedTitle = createVideoDto.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30);

        imageUrl = await this.fileUploadService.uploadImage(
          imageFile,
          `video-${sanitizedTitle}-${timestamp}-${randomHash}`
        );
      }

      // Parse date string to Date object
      const date = new Date(createVideoDto.date);

      const video = await (this.prisma as ExtendedPrismaService).video.create({
        data: {
          image: imageUrl || createVideoDto.image || '',
          title: createVideoDto.title,
          subtitle: createVideoDto.subtitle,
          description: createVideoDto.description,
          link: createVideoDto.link,
          date,
          active: createVideoDto.active !== undefined ? createVideoDto.active : true,
          categoryIds: createVideoDto.categoryIds,
        },
        include: {
          categories: true, // Include related categories
        },
      });

      this.logger.log(`Created new video: ${createVideoDto.title} (ID: ${video.id})`);
      return video;
    } catch (error) {
      this.logger.error(`Failed to create video: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get all videos
   * @param activeOnly - If true, returns only active videos
   * @param categoryId - Optional category ID to filter by
   * @returns Array of all videos
   */
  async findAll(activeOnly = false, categoryId?: string) {
    const where: any = {};

    // Filter by active status if requested
    if (activeOnly) {
      where.active = true;
    }

    // Filter by category if provided
    if (categoryId) {
      where.categoryIds = {
        has: categoryId,
      };
    }

    const videos = await (this.prisma as ExtendedPrismaService).video.findMany({
      where,
      orderBy: { date: 'desc' },
      include: {
        categories: true, // Include related categories
      },
    });

    return {
      videos,
      totalCount: videos.length,
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Get a specific video by ID
   * @param id - The ID of the video to find
   * @returns The found video or throws 404 if not found
   */
  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('Video ID must be provided');
    }

    const video = await (this.prisma as ExtendedPrismaService).video.findUnique({
      where: { id },
      include: {
        categories: true, // Include related categories
      },
    });

    if (!video) {
      throw new NotFoundException(`Video with ID '${id}' not found`);
    }

    return video;
  }

  /**
   * Update a video
   * @param id - The ID of the video to modify
   * @param updateVideoDto - The data to update
   * @param imageFile - Optional image file
   * @returns The updated video
   */
  async update(id: string, updateVideoDto: UpdateVideoDto, imageFile?: Multer.File) {
    try {
      // Verify video exists
      const existingVideo = await this.findOne(id);

      // Validate categories if provided
      if (updateVideoDto.categoryIds) {
        await this.categoriesService.validateCategoryIds(updateVideoDto.categoryIds);
      }

      // Parse date string to Date object if provided
      const data: any = { ...updateVideoDto };
      if (updateVideoDto.date) {
        data.date = new Date(updateVideoDto.date);
      }

      // Handle image upload if provided
      if (imageFile) {
        const timestamp = Date.now();
        const randomHash = Math.random().toString(36).substring(2, 10);
        const sanitizedTitle = updateVideoDto.title || existingVideo.title;
        const formattedTitle = sanitizedTitle
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30);

        const imageUrl = await this.fileUploadService.uploadImage(
          imageFile,
          `video-${formattedTitle}-${timestamp}-${randomHash}`
        );

        data.image = imageUrl;

        // Delete old image if it exists and is in our assets
        if (existingVideo.image && existingVideo.image.startsWith('/assets/')) {
          await this.fileUploadService.deleteFile(
            existingVideo.image.replace('/assets/', '')
          );
        }
      }

      const updatedVideo = await (this.prisma as ExtendedPrismaService).video.update({
        where: { id },
        data,
        include: {
          categories: true, // Include related categories
        },
      });

      this.logger.log(`Updated video: ${id}`);
      return updatedVideo;
    } catch (error) {
      this.logger.error(`Failed to update video: ${error.message}`);
      throw error;
    }
  }

  /**
   * Toggle the active status of a video
   * @param id - The ID of the video to toggle
   * @returns The updated video
   */
  async toggleStatus(id: string) {
    const video = await this.findOne(id);

    return (this.prisma as ExtendedPrismaService).video.update({
      where: { id },
      data: {
        active: !video.active,
      },
      include: {
        categories: true, // Include related categories
      },
    });
  }

  /**
   * Delete a video
   * @param id - The ID of the video to delete
   * @returns The deleted video
   */
  async remove(id: string) {
    await this.findOne(id); // Verify it exists

    return (this.prisma as ExtendedPrismaService).video.delete({
      where: { id },
      include: {
        categories: true, // Include related categories
      },
    });
  }

  /**
   * Get videos by category
   * @param categoryId - The ID of the category to filter by
   * @param activeOnly - If true, returns only active videos
   * @returns Array of videos in the specified category
   */
  async getVideosByCategory(categoryId: string, activeOnly = false) {
    // Verify category exists
    await this.categoriesService.findOne(categoryId);

    return this.findAll(activeOnly, categoryId);
  }

}