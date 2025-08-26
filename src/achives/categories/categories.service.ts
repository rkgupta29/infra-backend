import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new category
   * @param createCategoryDto - Data for the new category
   * @returns The created category
   */
  async create(createCategoryDto: CreateCategoryDto) {
    // Check if category with same name or slug already exists
    const existingCategory = await this.prisma.category.findFirst({
      where: {
        OR: [
          { name: createCategoryDto.name },
          { slug: createCategoryDto.slug },
        ],
      },
    });

    if (existingCategory) {
      throw new ConflictException(
        existingCategory.name === createCategoryDto.name
          ? `Category with name '${createCategoryDto.name}' already exists`
          : `Category with slug '${createCategoryDto.slug}' already exists`,
      );
    }

    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        videoIds: [], // Initialize with empty array
      },
    });
  }

  /**
   * Get all categories
   * @param activeOnly - If true, returns only active categories
   * @returns Array of all categories
   */
  async findAll(activeOnly = false) {
    const where = activeOnly ? { active: true } : {};
    return this.prisma.category.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        videos: true, // Include related videos
      },
    });
  }

  /**
   * Get a specific category by ID
   * @param id - The ID of the category to find
   * @returns The found category or throws 404 if not found
   */
  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('Category ID must be provided');
    }

    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        videos: true, // Include related videos
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID '${id}' not found`);
    }

    return category;
  }

  /**
   * Get a specific category by slug
   * @param slug - The slug of the category to find
   * @returns The found category or throws 404 if not found
   */
  async findBySlug(slug: string) {
    if (!slug) {
      throw new BadRequestException('Category slug must be provided');
    }

    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: {
        videos: true, // Include related videos
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with slug '${slug}' not found`);
    }

    return category;
  }

  /**
   * Update a category
   * @param id - The ID of the category to modify
   * @param updateCategoryDto - The data to update
   * @returns The updated category
   */
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    // Check if category exists
    await this.findOne(id);

    // If updating name or slug, check for conflicts
    if (updateCategoryDto.name || updateCategoryDto.slug) {
      const existingCategory = await this.prisma.category.findFirst({
        where: {
          OR: [
            updateCategoryDto.name ? { name: updateCategoryDto.name } : {},
            updateCategoryDto.slug ? { slug: updateCategoryDto.slug } : {},
          ],
          NOT: { id },
        },
      });

      if (existingCategory) {
        throw new ConflictException(
          existingCategory.name === updateCategoryDto.name
            ? `Category with name '${updateCategoryDto.name}' already exists`
            : `Category with slug '${updateCategoryDto.slug}' already exists`,
        );
      }
    }

    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
      include: {
        videos: true, // Include related videos
      },
    });
  }

  /**
   * Toggle the active status of a category
   * @param id - The ID of the category to toggle
   * @returns The updated category
   */
  async toggleStatus(id: string) {
    const category = await this.findOne(id);

    return this.prisma.category.update({
      where: { id },
      data: {
        active: !category.active,
      },
      include: {
        videos: true, // Include related videos
      },
    });
  }

  /**
   * Delete a category
   * @param id - The ID of the category to delete
   * @returns The deleted category
   */
  async remove(id: string) {
    await this.findOne(id); // Verify it exists

    // Check if any videos are using this category
    const videosWithCategory = await this.prisma.video.findMany({
      where: {
        categoryIds: {
          has: id,
        },
      },
    });

    if (videosWithCategory.length > 0) {
      throw new BadRequestException(
        `Cannot delete category because it is used by ${videosWithCategory.length} videos. Please remove the category from these videos first.`,
      );
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }

  /**
   * Validate that all category IDs exist
   * @param categoryIds - Array of category IDs to validate
   * @returns true if all categories exist, throws error otherwise
   */
  async validateCategoryIds(categoryIds: string[]) {
    if (!categoryIds || categoryIds.length === 0) {
      throw new BadRequestException('At least one category ID must be provided');
    }

    const categories = await this.prisma.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
    });

    if (categories.length !== categoryIds.length) {
      const foundIds = categories.map(cat => cat.id);
      const invalidIds = categoryIds.filter(id => !foundIds.includes(id));
      throw new BadRequestException(`Invalid category IDs: ${invalidIds.join(', ')}`);
    }

    return true;
  }
}
