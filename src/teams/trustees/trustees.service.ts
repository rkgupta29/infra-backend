import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTrusteeDto, UpdateTrusteeDto, TrusteeQueryDto } from './dto';
import { FileUploadService } from '../../common/file-upload/file-upload.service';
import type { Multer } from 'multer';

@Injectable()
export class TrusteesService {
  private readonly logger = new Logger(TrusteesService.name);

  constructor(
    private prisma: PrismaService,
    private readonly fileUploadService: FileUploadService,
  ) { }

  /**
   * Get all trustees with pagination and filtering
   * @param query Query parameters for filtering and pagination
   * @returns Trustees data with pagination info
   */
  async getTrustees(query?: TrusteeQueryDto) {
    const { page = 1, limit = 10, active, search } = query || {};

    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: any = {};

    if (active !== undefined) {
      where.active = active;
    }

    if (search) {
      where.title = {
        contains: search,
        mode: 'insensitive',
      };
    }

    // Get total count for pagination
    const totalCount = await this.prisma.trustee.count({ where });

    // Get trustees with pagination and filtering
    const trustees = await this.prisma.trustee.findMany({
      where,
      skip,
      take: limit,
      orderBy: { order: 'asc' },
    });

    return {
      trustees,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
      lastUpdated: new Date().toISOString()
    };
  }


  /**
   * Get a trustee by ID
   * @param id Trustee ID
   * @returns Trustee data
   */
  async getTrusteeById(id: string) {
    const trustee = await this.prisma.trustee.findUnique({
      where: { id }
    });

    if (!trustee) {
      throw new NotFoundException(`Trustee with ID ${id} not found`);
    }

    return trustee;
  }

  /**
   * Create a new trustee
   * @param data Trustee data to create
   * @param imageFile Optional image file
   * @param popupImgFile Optional popup image file
   * @returns Created trustee
   */
  async createTrustee(
    data: CreateTrusteeDto,
    imageFile?: Multer.File,
    popupImgFile?: Multer.File,
  ) {
    try {
      let imageUrl = '';
      let popupImgUrl = '';
      const isActive = data.active !== undefined ? data.active : true;

      // Handle image upload if provided
      if (imageFile) {
        const timestamp = Date.now();
        const randomHash = Math.random().toString(36).substring(2, 10);
        const sanitizedName = data.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30);

        imageUrl = await this.fileUploadService.uploadImage(
          imageFile,
          `trustee-${sanitizedName}-${timestamp}-${randomHash}`
        );
      }

      // Handle popup image upload if provided
      if (popupImgFile) {
        const timestamp = Date.now();
        const randomHash = Math.random().toString(36).substring(2, 10);
        const sanitizedName = data.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30);

        popupImgUrl = await this.fileUploadService.uploadImage(
          popupImgFile,
          `trustee-popup-${sanitizedName}-${timestamp}-${randomHash}`
        );
      }

      // Create trustee with uploaded file URLs
      const created = await this.prisma.trustee.create({
        data: {
          title: data.title,
          desig: data.desig,
          popupdesc: data.popupdesc,
          image: imageUrl || data.image || '',
          popupImg: popupImgUrl || data.popupImg || '',
          link: data.link,
          socialMedia: data.socialMedia,
          order: data.order || 0,
          active: isActive,
        },
      });

      this.logger.log(`Created new trustee: ${created.title} (ID: ${created.id})`);
      return created;
    } catch (error) {
      this.logger.error(`Failed to create trustee: ${error.message}`);
      throw error;
    }
  }

  /**
   * Update a trustee by ID
   * @param id Trustee ID
   * @param data Updated trustee data
   * @param imageFile Optional image file
   * @param popupImgFile Optional popup image file
   * @returns Updated trustee
   */
  async updateTrustee(
    id: string,
    data: UpdateTrusteeDto,
    imageFile?: Multer.File,
    popupImgFile?: Multer.File,
  ) {
    // Check if trustee exists
    const existingTrustee = await this.prisma.trustee.findUnique({ where: { id } });

    if (!existingTrustee) {
      throw new NotFoundException(`Trustee with ID ${id} not found`);
    }

    try {
      const updateData: any = { ...data };

      // Handle image upload if provided
      if (imageFile) {
        const timestamp = Date.now();
        const randomHash = Math.random().toString(36).substring(2, 10);
        const sanitizedName = data.title || existingTrustee.title;
        const formattedName = sanitizedName
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30);

        const imageUrl = await this.fileUploadService.uploadImage(
          imageFile,
          `trustee-${formattedName}-${timestamp}-${randomHash}`
        );

        updateData.image = imageUrl;

        // Delete old image if it exists and is in our assets
        if (existingTrustee.image && existingTrustee.image.startsWith('/assets/')) {
          await this.fileUploadService.deleteFile(
            existingTrustee.image.replace('/assets/', '')
          );
        }
      }

      // Handle popup image upload if provided
      if (popupImgFile) {
        const timestamp = Date.now();
        const randomHash = Math.random().toString(36).substring(2, 10);
        const sanitizedName = data.title || existingTrustee.title;
        const formattedName = sanitizedName
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30);

        const popupImgUrl = await this.fileUploadService.uploadImage(
          popupImgFile,
          `trustee-popup-${formattedName}-${timestamp}-${randomHash}`
        );

        updateData.popupImg = popupImgUrl;

        // Delete old popup image if it exists and is in our assets
        if (existingTrustee.popupImg && existingTrustee.popupImg.startsWith('/assets/')) {
          await this.fileUploadService.deleteFile(
            existingTrustee.popupImg.replace('/assets/', '')
          );
        }
      }

      // Create update data object with only the fields that should be updated
      const prismaUpdateData: any = {};

      if (updateData.title !== undefined) prismaUpdateData.title = updateData.title;
      if (updateData.desig !== undefined) prismaUpdateData.desig = updateData.desig;
      if (updateData.popupdesc !== undefined) prismaUpdateData.popupdesc = updateData.popupdesc;
      if (updateData.link !== undefined) prismaUpdateData.link = updateData.link;
      if (updateData.socialMedia !== undefined) prismaUpdateData.socialMedia = updateData.socialMedia;
      if (updateData.order !== undefined) prismaUpdateData.order = updateData.order;
      if (updateData.active !== undefined) prismaUpdateData.active = updateData.active;
      if (updateData.image !== undefined) prismaUpdateData.image = updateData.image;
      if (updateData.popupImg !== undefined) prismaUpdateData.popupImg = updateData.popupImg;

      // Update trustee in database
      const updatedTrustee = await this.prisma.trustee.update({
        where: { id },
        data: prismaUpdateData,
      });

      this.logger.log(`Updated trustee: ${id}`);
      return updatedTrustee;
    } catch (error) {
      this.logger.error(`Failed to update trustee: ${error.message}`);
      throw error;
    }
  }

  /**
   * Delete a trustee by ID
   * @param id Trustee ID
   */
  async deleteTrustee(id: string) {
    // Check if trustee exists
    await this.getTrusteeById(id);

    // Delete from database
    await this.prisma.trustee.delete({
      where: { id }
    });

    return;
  }
}