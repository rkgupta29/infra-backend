import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamDto, UpdateTeamDto, TeamQueryDto } from './dto';
import { FileUploadService } from '../../common/file-upload/file-upload.service';
import type { Multer } from 'multer';

@Injectable()
export class TeamService {
  private readonly logger = new Logger(TeamService.name);

  constructor(
    private prisma: PrismaService,
    private readonly fileUploadService: FileUploadService,
  ) { }

  /**
   * Get all team members with pagination and filtering
   * @param query Query parameters for filtering and pagination
   * @returns Team data with pagination info
   */
  async getTeam(query?: TeamQueryDto) {
    const { page = 1, limit = 10, active, search } = query || {};
    const skip = (page - 1) * limit;

    // Build Prisma filter conditions
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

    // Query the database using Prisma
    const [team, totalCount] = await Promise.all([
      this.prisma.team.findMany({
        where,
        skip,
        take: limit,
        orderBy: { order: 'asc' },
      }),
      this.prisma.team.count({ where }),
    ]);

    return {
      team,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
      lastUpdated: new Date().toISOString(),
    };
  }



  /**
   * Get a team member by ID
   * @param id Team member ID
   * @returns Team member data
   */
  async getTeamMemberById(id: string) {
    // For now, use static data
    const staticTeam = await this.prisma.team.findUnique({ where: { id } });
    const teamMember = staticTeam;

    if (!teamMember) {
      throw new NotFoundException(`Team member with ID ${id} not found`);
    }

    return teamMember;
  }

  /**
   * Create a new team member
   * @param data Team member data to create
   * @param imageFile Optional image file
   * @param popupImgFile Optional popup image file
   * @returns Created team member
   */
  async createTeamMember(
    data: CreateTeamDto,
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
          `team-${sanitizedName}-${timestamp}-${randomHash}`
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
          `team-popup-${sanitizedName}-${timestamp}-${randomHash}`
        );
      }

      console.log("data to be created", data)

      const created = await this.prisma.team.create({
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

      this.logger.log(`Created new team member: ${created.title} (ID: ${created.id})`);
      return created;
    } catch (error) {
      this.logger.error(`Failed to create team member: ${error.message}`);
      throw error;
    }
  }

  /**
   * Update a team member by ID
   * @param id Team member ID
   * @param data Updated team member data
   * @param imageFile Optional image file
   * @param popupImgFile Optional popup image file
   * @returns Updated team member
   */
  async updateTeamMember(
    id: string,
    data: UpdateTeamDto,
    imageFile?: Multer.File,
    popupImgFile?: Multer.File,
  ) {
    // Check if team member exists
    const existingTeamMember = await this.prisma.team.findUnique({ where: { id } });

    try {
      const updateData: any = { ...data };

      // Handle image upload if provided
      if (imageFile) {
        const timestamp = Date.now();
        const randomHash = Math.random().toString(36).substring(2, 10);
        const sanitizedName = data.title || existingTeamMember?.title;
        const formattedName = sanitizedName ?? ""
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30);

        const imageUrl = await this.fileUploadService.uploadImage(
          imageFile,
          `team-${formattedName}-${timestamp}-${randomHash}`
        );

        updateData.image = imageUrl;

        // Delete old image if it exists and is in our assets
        if (existingTeamMember?.image && existingTeamMember.image.startsWith('/assets/')) {
          await this.fileUploadService.deleteFile(
            existingTeamMember.image.replace('/assets/', '')
          );
        }
      }

      // Handle popup image upload if provided
      if (popupImgFile) {
        const timestamp = Date.now();
        const randomHash = Math.random().toString(36).substring(2, 10);
        const sanitizedName = data.title || existingTeamMember?.title;
        const formattedName = sanitizedName ?? ""
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30);

        const popupImgUrl = await this.fileUploadService.uploadImage(
          popupImgFile,
          `team-popup-${formattedName}-${timestamp}-${randomHash}`
        );

        updateData.popupImg = popupImgUrl;

        // Delete old popup image if it exists and is in our assets
        if (existingTeamMember?.popupImg && existingTeamMember.popupImg.startsWith('/assets/')) {
          await this.fileUploadService.deleteFile(
            existingTeamMember.popupImg.replace('/assets/', '')
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

      // Update team member in database
      const updatedTeamMember = await this.prisma.team.update({
        where: { id },
        data: prismaUpdateData,
      });

      this.logger.log(`Updated team member: ${id}`);
      return updatedTeamMember;
    } catch (error) {
      this.logger.error(`Failed to update team member: ${error.message}`);
      throw error;
    }
  }

  /**
   * Delete a team member by ID
   * @param id Team member ID
   */
  async deleteTeamMember(id: string) {
    // Check if team member exists
    await this.prisma.team.delete({ where: { id } });

    // In a real implementation, we would delete from the database
    // For now, just return success
    return;
  }
}