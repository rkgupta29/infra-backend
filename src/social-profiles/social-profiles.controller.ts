import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SocialProfilesService } from './social-profiles.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { CreateSocialProfileDto } from './dto/create-social-profile.dto';
import { UpdateSocialProfileValueDto } from './dto/update-social-profile-value.dto';

@ApiTags('Social Profiles')
@Controller('social-profiles')
export class SocialProfilesController {
  constructor(private readonly service: SocialProfilesService) {}

  @Get()
  @ApiOperation({ summary: 'Read all social profiles' })
  async listAll() {
    return this.service.listAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a social profile' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiBadRequestResponse({ description: 'Invalid slug or value' })
  @ApiConflictResponse({ description: 'Duplicate slug' })
  async create(@Body() dto: CreateSocialProfileDto) {
    return this.service.create(dto.slug, dto.value, dto.active);
  }

  @Patch(':slug/toggle')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Toggle active flag for a profile' })
  @ApiParam({ name: 'slug', example: 'twitter' })
  async toggle(@Param('slug') slug: string) {
    return this.service.toggleActive(slug);
  }

  @Delete(':slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a profile' })
  @ApiParam({ name: 'slug', example: 'twitter' })
  async remove(@Param('slug') slug: string) {
    return this.service.delete(slug);
  }

  @Patch(':slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update a profile value (slug not patched)' })
  @ApiParam({ name: 'slug', example: 'twitter' })
  async updateValue(
    @Param('slug') slug: string,
    @Body() dto: UpdateSocialProfileValueDto,
  ) {
    return this.service.updateValue(slug, dto.value);
  }
}


