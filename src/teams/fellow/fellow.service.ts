import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFellowDto } from './dto/create-fellow.dto';
import { UpdateFellowDto } from './dto/update-fellow.dto';
import { FileUploadService } from '../../common/file-upload/file-upload.service';
import type { Multer } from 'multer';

// Note: This is a temporary workaround until the Prisma client is regenerated
interface ExtendedPrismaService extends PrismaService {
  fellow: any;
}

@Injectable()
export class FellowService {
  private readonly logger = new Logger(FellowService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploadService: FileUploadService,
  ) { }

  /**
   * Create a new fellow
   */
  async create(
    createFellowDto: CreateFellowDto,
    imageFile?: Multer.File,
    popupImageFile?: Multer.File,
  ) {
    try {
      let imageUrl = '';
      let popupImgUrl = '';

      // Handle image upload if provided
      if (imageFile) {
        const timestamp = Date.now();
        const randomHash = Math.random().toString(36).substring(2, 10);
        const sanitizedName = createFellowDto.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30);

        imageUrl = await this.fileUploadService.uploadImage(
          imageFile,
          `fellow-${sanitizedName}-${timestamp}-${randomHash}`
        );
      } else {
        throw new BadRequestException('Image file is required');
      }

      // Handle popup image upload if provided
      if (popupImageFile) {
        const timestamp = Date.now();
        const randomHash = Math.random().toString(36).substring(2, 10);
        const sanitizedName = createFellowDto.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30);

        popupImgUrl = await this.fileUploadService.uploadImage(
          popupImageFile,
          `fellow-popup-${sanitizedName}-${timestamp}-${randomHash}`
        );
      }

      // Create fellow with file URL
      const fellow = await (this.prisma as ExtendedPrismaService).fellow.create({
        data: {
          image: imageUrl,
          title: createFellowDto.title,
          desig: createFellowDto.desig,
          subtitle: createFellowDto.subtitle,
          popupdesc: createFellowDto.popupdesc,
          link: createFellowDto.link,
          socialMedia: createFellowDto.socialMedia,
          popupImg: popupImgUrl || null,
          active: createFellowDto.active !== undefined ? createFellowDto.active : true,
        },
      });

      this.logger.log(`Created new fellow: ${createFellowDto.title}`);
      return fellow;
    } catch (error) {
      this.logger.error(`Failed to create fellow: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get all fellows with pagination
   */
  async findAll(page = 1, limit = 10, activeOnly = false) {
    try {
      const skip = (page - 1) * limit;

      const where = activeOnly ? { active: true } : {};

      const [fellows, total] = await Promise.all([
        (this.prisma as ExtendedPrismaService).fellow.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        (this.prisma as ExtendedPrismaService).fellow.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data: fellows,
        meta: {
          total,
          page,
          limit,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      this.logger.error(`Failed to fetch fellows: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get a specific fellow by ID
   */
  async findOne(id: string) {
    const fellow = await (this.prisma as ExtendedPrismaService).fellow.findUnique({
      where: { id },
    });

    if (!fellow) {
      throw new NotFoundException(`Fellow with ID ${id} not found`);
    }

    return fellow;
  }

  /**
   * Update a fellow
   */
  async update(
    id: string,
    updateFellowDto: UpdateFellowDto,
    imageFile?: Multer.File,
    popupImageFile?: Multer.File,
  ) {
    // Check if fellow exists
    const existingFellow = await this.findOne(id);

    try {
      const updateData: any = { ...updateFellowDto };

      // Handle image upload if provided
      if (imageFile) {
        const timestamp = Date.now();
        const randomHash = Math.random().toString(36).substring(2, 10);
        const sanitizedName = updateFellowDto.title || existingFellow.title;
        const formattedName = sanitizedName
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30);

        const imageUrl = await this.fileUploadService.uploadImage(
          imageFile,
          `fellow-${formattedName}-${timestamp}-${randomHash}`
        );

        updateData.image = imageUrl;

        if (existingFellow.image && existingFellow.image.startsWith('/assets/')) {
          await this.fileUploadService.deleteFile(
            existingFellow.image.replace('/assets/', '')
          );
        }
      }

      // Handle popup image upload if provided
      if (popupImageFile) {
        const timestamp = Date.now();
        const randomHash = Math.random().toString(36).substring(2, 10);
        const sanitizedName = updateFellowDto.title || existingFellow.title;
        const formattedName = sanitizedName
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30);

        const popupImgUrl = await this.fileUploadService.uploadImage(
          popupImageFile,
          `fellow-popup-${formattedName}-${timestamp}-${randomHash}`
        );

        updateData.popupImg = popupImgUrl;

        if (existingFellow.popupImg && existingFellow.popupImg.startsWith('/assets/')) {
          await this.fileUploadService.deleteFile(
            existingFellow.popupImg.replace('/assets/', '')
          );
        }
      }

      // Update fellow
      const updatedFellow = await (this.prisma as ExtendedPrismaService).fellow.update({
        where: { id },
        data: updateData,
      });

      this.logger.log(`Updated fellow: ${id}`);
      return updatedFellow;
    } catch (error) {
      this.logger.error(`Failed to update fellow: ${error.message}`);
      throw error;
    }
  }

  /**
   * Toggle fellow active status
   */
  async toggleStatus(id: string) {
    // Check if fellow exists
    const fellow = await this.findOne(id);

    // Toggle active status
    return (this.prisma as ExtendedPrismaService).fellow.update({
      where: { id },
      data: { active: !fellow.active },
    });
  }

  /**
   * Delete a fellow
   */
  async remove(id: string) {
    // Check if fellow exists
    const fellow = await this.findOne(id);

    try {
      // Delete the fellow
      await (this.prisma as ExtendedPrismaService).fellow.delete({
        where: { id },
      });

      // Delete image if it exists and is in our assets
      if (fellow.image && fellow.image.startsWith('/assets/')) {
        await this.fileUploadService.deleteFile(
          fellow.image.replace('/assets/', '')
        );
      }

      // Delete popup image if it exists and is in our assets
      if (fellow.popupImg && fellow.popupImg.startsWith('/assets/')) {
        await this.fileUploadService.deleteFile(
          fellow.popupImg.replace('/assets/', '')
        );
      }

      this.logger.log(`Deleted fellow: ${id}`);
      return { success: true, message: 'Fellow deleted successfully' };
    } catch (error) {
      this.logger.error(`Failed to delete fellow: ${error.message}`);
      throw error;
    }
  }

  /**
   * Legacy method to get static fellows data
   */
  async getFellow() {
    // Try to get from database first
    try {
      const result = await this.findAll(1, 100, true);

      // If we have data in the database, return it
      if (result.data.length > 0) {
        return {
          fellow: result.data,
          totalCount: result.meta.total,
          lastUpdated: new Date().toISOString()
        };
      }
    } catch (error) {
      this.logger.warn('Failed to get fellows from database, falling back to static data');
    }

    // Fallback to static data
    const fellow: any[] = [
      {
        image: "/assets/home/fellows/rasikaAthawale.jpg",
        title: "Rasika Athawale",
        desig: "Electricity policy & regulatory expert; Consultant, Big4 Consulting",
        subtitle: "Distinguished Fellow (Power)",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        link: "https://www.linkedin.com/in/rasika-athawale-5072ab1/",
        socialMedia: "linkedin",
        popupdesc: `Rasika Athawale is a management professional with approximately two decades of experience in the energy and utilities sector.`,
      },
      // More fellows would be here in the actual implementation
    ];

    return {
      fellow,
      totalCount: fellow.length,
      lastUpdated: new Date().toISOString()
    };
  }
}