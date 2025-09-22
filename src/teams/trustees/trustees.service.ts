import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTrusteeDto, UpdateTrusteeDto, TrusteeQueryDto } from './dto';

@Injectable()
export class TrusteesService {
  constructor(private prisma: PrismaService) { }

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
   * @returns Created trustee
   */
  async createTrustee(data: CreateTrusteeDto) {
    // Set default values if not provided
    const trusteeData = {
      ...data,
      order: data.order ?? 0,
      active: data.active ?? true
    };

    // Create new trustee in database
    return this.prisma.trustee.create({
      data: trusteeData
    });
  }

  /**
   * Update a trustee by ID
   * @param id Trustee ID
   * @param data Updated trustee data
   * @returns Updated trustee
   */
  async updateTrustee(id: string, data: UpdateTrusteeDto) {
    // Check if trustee exists
    await this.getTrusteeById(id);

    // Update trustee in database
    return this.prisma.trustee.update({
      where: { id },
      data
    });
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