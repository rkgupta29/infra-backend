import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse
} from '@nestjs/swagger';
import { HomepageService } from './homepage.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
// Remove UserRole import if not available f  rom @prisma/client
import { UpdateSectionDto } from './dto/update-section.dto';

@ApiTags('Homepage Content Management')
@Controller('/content')//home
export class HomepageController {

  constructor(private readonly service: HomepageService) { }

  /**
   * Get all homepage sections
   * This endpoint is public and returns all active sections
   */
  @Get()
  @ApiOperation({
    summary: 'Get all homepage sections',
    description: 'Retrieves all active homepage sections. This endpoint is public and does not require authentication.'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All homepage sections retrieved successfully',
    schema: {
      example: [
        {
          sectionKey: 'hero',
          data: {
            title: 'Independent think tank',
            subtitle: 'seeking to impact India\'s infrastructure landscape',
            description: 'Helping shape public discourse and policy interventions through action research and advocacy.',
            backgroundImage: '/images/hero-bg.jpg',
            cta: [
              { text: 'Learn More', target: '/about', variant: 'primary' },
              { text: 'Contact Us', target: '/contact', variant: 'secondary' }
            ]
          }
        },
        {
          sectionKey: 'about',
          data: {
            title: 'About Us',
            description: 'We are dedicated to improving infrastructure policy in India.',
            image: '/images/about.jpg',
            subtitles: ['Research Excellence', 'Policy Impact', 'Collaborative Approach'],
            paragraphs: [
              { title: 'Our Mission', content: 'To transform infrastructure policy through research.' },
              { title: 'Our Vision', content: 'A future with sustainable and inclusive infrastructure.' }
            ]
          }
        }
      ]
    }
  })
  async getAllSections() {
    return this.service.getAllSections();
  }

  /**
   * Get a specific homepage section
   * This endpoint is public and returns the section data
   */
  @Get(':key')
  @ApiOperation({
    summary: 'Get a specific homepage section',
    description: 'Retrieves a specific homepage section by its key. This endpoint is public and does not require authentication.'
  })
  @ApiParam({
    name: 'key',
    description: 'The unique identifier for the section (e.g., hero, about, features)',
    example: 'hero'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Section retrieved successfully',
    schema: {
      example: {
        title: 'Independent think tank',
        subtitle: 'seeking to impact India\'s infrastructure landscape',
        description: 'Helping shape public discourse and policy interventions through action research and advocacy.',
        backgroundImage: '/images/hero-bg.jpg',
        cta: [
          { text: 'Learn More', target: '/about', variant: 'primary' },
          { text: 'Contact Us', target: '/contact', variant: 'secondary' }
        ]
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Section not found (will create default if it doesn\'t exist)'
  })
  async getSection(@Param('key') key: string) {
    const section = await this.service.getSection(key);
    return section.data;
  }

  /**
   * Create a new homepage section
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create a new homepage section',
    description: 'Adds a new homepage section. This endpoint requires ADMIN or SUPERADMIN authentication.'
  })
  @ApiBody({
    schema: {
      example: {
        sectionKey: 'newsection',
        data: {
          title: 'New Section',
          description: 'Description for the new section',
          // ...other fields as needed
        }
      }
    },
    description: 'The sectionKey and data object for the new section'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Section created successfully'
  })
  @ApiBadRequestResponse({
    description: 'Bad Request - Invalid data format or sectionKey already exists'
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token'
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions'
  })
  @HttpCode(HttpStatus.CREATED)
  async createSection(
    @Body() body: { sectionKey: string; data: Record<string, any> }
  ) {
    return this.service.createSection(body.sectionKey, body.data);
  }

  /**
   * Get all homepage section keys
   * This endpoint is public and returns all section keys for the homepage
   */
  @Get('/keys/list')
  @ApiOperation({
    summary: 'Get all homepage section keys',
    description: 'Returns an array of all section keys for the homepage. This endpoint is public.'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All homepage section keys retrieved successfully',
    schema: {
      example: ['hero', 'about', 'features']
    }
  })
  async getHomepageSectionKeys() {
    return this.service.getHomepageSectionKeys();
  }

  /**
   * Update a homepage section completely
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Patch(':key')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update a homepage section completely',
    description: 'Updates a homepage section with completely new data. This endpoint requires ADMIN or SUPERADMIN authentication.'
  })
  @ApiParam({
    name: 'key',
    description: 'The unique identifier for the section to update',
    example: 'hero'
  })
  @ApiBody({
    type: UpdateSectionDto,
    description: 'The complete data object for the section'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Section updated successfully'
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token'
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions'
  })
  @ApiBadRequestResponse({
    description: 'Bad Request - Invalid data format'
  })
  @HttpCode(HttpStatus.OK)
  async updateSection(@Param('key') key: string, @Body() dto: UpdateSectionDto) {
    return this.service.updateSection(key, dto.data);
  }

  /**
   * Toggle section active status
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Patch(':key/toggle-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Toggle section active status',
    description: 'Toggles the active status of a homepage section. This endpoint requires ADMIN or SUPERADMIN authentication.'
  })
  @ApiParam({
    name: 'key',
    description: 'The unique identifier for the section to toggle',
    example: 'hero'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Section status toggled successfully'
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token'
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions'
  })
  @ApiNotFoundResponse({
    description: 'Section not found'
  })
  @HttpCode(HttpStatus.OK)
  async toggleSectionStatus(@Param('key') key: string) {
    return this.service.toggleSectionStatus(key);
  }

  /**
   * Delete a homepage section
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Delete(':key')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete a homepage section',
    description: 'Permanently deletes a homepage section. This action cannot be undone. This endpoint requires ADMIN or SUPERADMIN authentication.'
  })
  @ApiParam({
    name: 'key',
    description: 'The unique identifier for the section to delete',
    example: 'hero'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Section deleted successfully'
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token'
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions'
  })
  @ApiNotFoundResponse({
    description: 'Section not found'
  })
  @HttpCode(HttpStatus.OK)
  async deleteSection(@Param('key') key: string) {
    return this.service.deleteSection(key);
  }

  @Post('/seed')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Seed the homepage with provided sections',
    description: 'Seeds the homepage with provided sections JSON. This endpoint requires ADMIN or SUPERADMIN authentication.'
  })
  @ApiBody({
    description: 'JSON array of homepage sections to seed',
    schema: {
      example: [
        {
          sectionKey: 'hero',
          data: {
            title: 'Independent think tank',
            subtitle: 'seeking to impact India\'s infrastructure landscape',
            description: 'Helping shape public discourse and policy interventions through action research and advocacy.',
            backgroundImage: '/images/hero-bg.jpg',
            cta: [
              { text: 'Learn More', target: '/about', variant: 'primary' },
              { text: 'Contact Us', target: '/contact', variant: 'secondary' }
            ]
          }
        },
        {
          sectionKey: 'about',
          data: {
            title: 'About Us',
            description: 'We are dedicated to improving infrastructure policy in India.',
            image: '/images/about.jpg',
            subtitles: ['Research Excellence', 'Policy Impact', 'Collaborative Approach'],
            paragraphs: [
              { title: 'Our Mission', content: 'To transform infrastructure policy through research.' },
              { title: 'Our Vision', content: 'A future with sustainable and inclusive infrastructure.' }
            ]
          }
        }
      ]
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Homepage seeded successfully'
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token'
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - Insufficient permissions'
  })
  @HttpCode(HttpStatus.OK)
  async seedHomepage(@Body() sections: any) {
    return this.service.seedHomepageContent(sections);
  }
}
