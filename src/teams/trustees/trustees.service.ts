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

    // For now, use the static trustees data with pagination and filtering
    const staticTrustees = this.getStaticTrustees();

    // Apply filtering
    let filteredTrustees = staticTrustees;
    if (active !== undefined) {
      filteredTrustees = filteredTrustees.filter(t => t.active === active);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredTrustees = filteredTrustees.filter(t =>
        t.title.toLowerCase().includes(searchLower)
      );
    }

    // Apply pagination
    const totalCount = filteredTrustees.length;
    const trustees = filteredTrustees.slice(skip, skip + limit);

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
   * Get static trustees data
   * @returns Array of trustees
   */
  private getStaticTrustees() {
    return [
      {
        id: "1",
        image: "/assets/home/trustees/vinayakImg.png",
        title: "Vinayak Chatterjee",
        desig: "Founder & Managing Trustee",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        link: "https://x.com/infra_vinayakch?lang=en",
        socialMedia: "X",
        popupdesc: `Vinayak Chatterjee co-founded Feedback Infra Pvt Ltd in 1990 and served as its Chairman from 1990 to 2021...`,
        order: 0,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "2",
        image: "/assets/home/trustees/Rumjhum.jpg",
        title: "Rumjhum Chatterjee",
        desig: "Co-Founder & Managing Trustee",
        popupImg: "/assets/home/trustees/rumjhumImg.png",
        link: "https://www.linkedin.com/in/rumjhum-chatterjee-396041268/",
        socialMedia: "linkedin",
        popupdesc: `Rumjhum Chatterjee co-founded the Feedback Infra Group...`,
        order: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "3",
        image: "/assets/home/trustees/Kiran.jpg",
        title: "Kiran Karnik",
        desig: "Trustee, The Infravision Foundation; Former President, NASSCOM; Former MD and CEO, Discovery Networks in India",
        popupImg: "/assets/home/trustees/kiranImg.png",
        popupdesc: `Kiran Karnik is a distinguished professional with a career spanning public service and the corporate world...`,
        order: 2,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  /**
   * Get a trustee by ID
   * @param id Trustee ID
   * @returns Trustee data
   */
  async getTrusteeById(id: string) {
    // For now, use static data
    const staticTrustees = this.getStaticTrustees();
    const trustee = staticTrustees.find(t => t.id === id);

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
    // For now, return mock data
    return {
      ...data,
      id: `mock-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      active: data.active ?? true
    };
  }

  /**
   * Update a trustee by ID
   * @param id Trustee ID
   * @param data Updated trustee data
   * @returns Updated trustee
   */
  async updateTrustee(id: string, data: UpdateTrusteeDto) {
    // Check if trustee exists
    const trustee = await this.getTrusteeById(id);

    // For now, return mock updated data
    return {
      ...trustee,
      ...data,
      updatedAt: new Date()
    };
  }

  /**
   * Delete a trustee by ID
   * @param id Trustee ID
   */
  async deleteTrustee(id: string) {
    // Check if trustee exists
    await this.getTrusteeById(id);

    // In a real implementation, we would delete from the database
    // For now, just return success
    return;
  }
}