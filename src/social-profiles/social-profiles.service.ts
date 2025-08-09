import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SocialProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async listAll() {
    return this.prisma.socialProfile.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(slug: string, value: string, active = true) {
    const normalizedSlug = slug.trim();
    if (!normalizedSlug || /\s/.test(normalizedSlug)) {
      throw new BadRequestException('Slug must be a non-empty string without spaces');
    }
    if (!value || !value.trim()) {
      throw new BadRequestException('Value must be a non-empty string');
    }

    try {
      return await this.prisma.socialProfile.create({
        data: { slug: normalizedSlug, value: value.trim(), active },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('A profile with this slug already exists');
      }
      throw error;
    }
  }

  async toggleActive(slug: string) {
    const profile = await this.prisma.socialProfile.findUnique({ where: { slug } });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return this.prisma.socialProfile.update({
      where: { slug },
      data: { active: !profile.active },
    });
  }

  async delete(slug: string) {
    const existing = await this.prisma.socialProfile.findUnique({ where: { slug } });
    if (!existing) {
      throw new NotFoundException('Profile not found');
    }
    await this.prisma.socialProfile.delete({ where: { slug } });
    return { message: 'Profile deleted', slug };
  }

  async updateValue(slug: string, value: string) {
    if (!value || !value.trim()) {
      throw new BadRequestException('Value must be a non-empty string');
    }
    const existing = await this.prisma.socialProfile.findUnique({ where: { slug } });
    if (!existing) {
      throw new NotFoundException('Profile not found');
    }
    return this.prisma.socialProfile.update({
      where: { slug },
      data: { value: value.trim() },
    });
  }
}


