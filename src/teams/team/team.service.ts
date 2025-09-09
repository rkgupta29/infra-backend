import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamDto, UpdateTeamDto, TeamQueryDto } from './dto';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) { }

  /**
   * Get all team members with pagination and filtering
   * @param query Query parameters for filtering and pagination
   * @returns Team data with pagination info
   */
  async getTeam(query?: TeamQueryDto) {
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

    // For now, use the static team data with pagination and filtering
    const staticTeam = this.getStaticTeam();

    // Apply filtering
    let filteredTeam = staticTeam;
    if (active !== undefined) {
      filteredTeam = filteredTeam.filter(t => t.active === active);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredTeam = filteredTeam.filter(t =>
        t.title.toLowerCase().includes(searchLower)
      );
    }

    // Apply pagination
    const totalCount = filteredTeam.length;
    const team = filteredTeam.slice(skip, skip + limit);

    return {
      team,
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
   * Get static team data
   * @returns Array of team members
   */
  private getStaticTeam() {
    return [
      {
        id: "1",
        image: "/assets/home/trustees/vinayakImg.png",
        title: "Vinayak Chatterjee",
        desig: "Founder & Managing Trustee",
        link: "https://x.com/infra_vinayakch?lang=en",
        socialMedia: "X",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        popupdesc: `Vinayak Chatterjee co-founded Feedback Infra Pvt Ltd in 1990 and served as its Chairman from 1990 to 2021...`,
        order: 0,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "2",
        image: "/assets/home/team/RumjhumChatterjee.jpg",
        title: "Rumjhum Chatterjee",
        desig: "Co-Founder & Managing Trustee",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        link: "https://www.linkedin.com/in/rumjhum-chatterjee-396041268",
        socialMedia: "linkedin",
        popupdesc: `Rumjhum Chatterjee co-founded the Feedback Infra Group...`,
        order: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  /**
   * Get a team member by ID
   * @param id Team member ID
   * @returns Team member data
   */
  async getTeamMemberById(id: string) {
    // For now, use static data
    const staticTeam = this.getStaticTeam();
    const teamMember = staticTeam.find(t => t.id === id);

    if (!teamMember) {
      throw new NotFoundException(`Team member with ID ${id} not found`);
    }

    return teamMember;
  }

  /**
   * Create a new team member
   * @param data Team member data to create
   * @returns Created team member
   */
  async createTeamMember(data: CreateTeamDto) {
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
   * Update a team member by ID
   * @param id Team member ID
   * @param data Updated team member data
   * @returns Updated team member
   */
  async updateTeamMember(id: string, data: UpdateTeamDto) {
    // Check if team member exists
    const teamMember = await this.getTeamMemberById(id);

    // For now, return mock updated data
    return {
      ...teamMember,
      ...data,
      updatedAt: new Date()
    };
  }

  /**
   * Delete a team member by ID
   * @param id Team member ID
   */
  async deleteTeamMember(id: string) {
    // Check if team member exists
    await this.getTeamMemberById(id);

    // In a real implementation, we would delete from the database
    // For now, just return success
    return;
  }
}