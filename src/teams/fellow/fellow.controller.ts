import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UploadedFiles,
  Patch,
  UseGuards,
  ParseBoolPipe
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import { FellowService } from './fellow.service';
import { CreateFellowDto } from './dto/create-fellow.dto';
import { UpdateFellowDto } from './dto/update-fellow.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('Teams')
@Controller('teams/fellow')
export class FellowController {
  constructor(private readonly service: FellowService) { }

  /**
   * Get all fellows
   * This endpoint returns fellows data
   */
  @Get()
  @ApiOperation({
    summary: 'Get all fellows',
    description: 'Retrieves fellows data. This endpoint is public and does not require authentication.'
  })
  @ApiResponse({
    status: 200,
    description: 'Fellows data retrieved successfully',
  })
  async getFellow() {
    return this.service.getFellow();
  }

  /**
   * Get all fellows with pagination (admin)
   */
  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get all fellows with pagination (admin)',
    description: 'Admin endpoint to retrieve all fellows with pagination'
  })
  @ApiResponse({
    status: 200,
    description: 'Fellows retrieved successfully',
  })
  async getAllFellows(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('activeOnly', ParseBoolPipe) activeOnly?: boolean,
  ) {
    return this.service.findAll(
      page ? +page : 1,
      limit ? +limit : 10,
      activeOnly || false
    );
  }

  /**
   * Get fellow by ID
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get fellow by ID',
    description: 'Retrieve a specific fellow by ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Fellow retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Fellow not found',
  })
  async getFellowById(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /**
   * Create a new fellow
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Create a new fellow',
    description: 'Create a new fellow with image upload'
  })
  @ApiBody({
    description: 'Fellow data with image upload',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Fellow image file (optional)',
        },
        popupImage: {
          type: 'string',
          format: 'binary',
          description: 'Fellow popup image file (optional)',
        },
        title: {
          type: 'string',
          description: 'Fellow name',
        },
        desig: {
          type: 'string',
          description: 'Fellow designation',
        },
        subtitle: {
          type: 'string',
          description: 'Fellow subtitle',
        },
        popupdesc: {
          type: 'string',
          description: 'Fellow description',
        },
        link: {
          type: 'string',
          description: 'Social media profile link (optional)',
        },
        socialMedia: {
          type: 'string',
          description: 'Social media platform (optional)',
        },
        active: {
          type: 'boolean',
          description: 'Whether the fellow is active (optional)',
        },
      },
      required: ['title', 'desig', 'subtitle', 'popupdesc'],
    },
  })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'popupImage', maxCount: 1 },
  ]))
  async create(
    @Body() body: any,
    @UploadedFiles() files: { image?: Array<Multer.File>, popupImage?: Array<Multer.File> }
  ) {
    const createFellowDto: CreateFellowDto = {
      title: body.title,
      desig: body.desig,
      subtitle: body.subtitle,
      popupdesc: body.popupdesc,
      link: body.link,
      socialMedia: body.socialMedia,
      active: body.active === undefined ? undefined : body.active === 'true' || body.active === true,
    };

    return this.service.create(
      createFellowDto,
      files.image?.[0],
      files.popupImage?.[0]
    );
  }

  /**
   * Update a fellow
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Update a fellow',
    description: 'Update an existing fellow with optional image upload'
  })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'popupImage', maxCount: 1 },
  ]))
  @ApiBody({
    description: 'Fellow data with optional image upload',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Fellow image file (optional)',
        },
        popupImage: {
          type: 'string',
          format: 'binary',
          description: 'Fellow popup image file (optional)',
        },
        title: {
          type: 'string',
          description: 'Fellow name (optional)',
        },
        desig: {
          type: 'string',
          description: 'Fellow designation (optional)',
        },
        subtitle: {
          type: 'string',
          description: 'Fellow subtitle (optional)',
        },
        popupdesc: {
          type: 'string',
          description: 'Fellow description (optional)',
        },
        link: {
          type: 'string',
          description: 'Social media profile link (optional)',
        },
        socialMedia: {
          type: 'string',
          description: 'Social media platform (optional)',
        },
        active: {
          type: 'boolean',
          description: 'Whether the fellow is active (optional)',
        },
      },
      required: [],
    },
  })
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFiles() files: { image?: Array<Multer.File>, popupImage?: Array<Multer.File> }
  ) {
    const updateFellowDto: UpdateFellowDto = {};

    if (body.title !== undefined) updateFellowDto.title = body.title;
    if (body.desig !== undefined) updateFellowDto.desig = body.desig;
    if (body.subtitle !== undefined) updateFellowDto.subtitle = body.subtitle;
    if (body.popupdesc !== undefined) updateFellowDto.popupdesc = body.popupdesc;
    if (body.link !== undefined) updateFellowDto.link = body.link;
    if (body.socialMedia !== undefined) updateFellowDto.socialMedia = body.socialMedia;
    if (body.active !== undefined) {
      updateFellowDto.active = body.active === 'true' || body.active === true;
    }

    return this.service.update(
      id,
      updateFellowDto,
      files.image?.[0],
      files.popupImage?.[0]
    );
  }

  /**
   * Toggle fellow active status
   */
  @Patch(':id/toggle-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Toggle fellow active status',
    description: 'Toggle the active status of a fellow'
  })
  async toggleStatus(@Param('id') id: string) {
    return this.service.toggleStatus(id);
  }

  /**
   * Delete a fellow
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete a fellow',
    description: 'Delete a fellow and associated files'
  })
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}