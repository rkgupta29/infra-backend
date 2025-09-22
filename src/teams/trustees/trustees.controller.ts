import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFiles
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import { TrusteesService } from './trustees.service';
import { CreateTrusteeDto, UpdateTrusteeDto, TrusteeQueryDto } from './dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';

@ApiTags('Teams')
@Controller('teams/trustees')
export class TrusteesController {
  constructor(private readonly service: TrusteesService) { }

  /**
   * Get all trustees with pagination and filtering
   */
  @Get()
  @ApiOperation({
    summary: 'Get all trustees',
    description: 'Retrieves trustees data with pagination and filtering options. This endpoint is public and does not require authentication.'
  })
  @ApiResponse({
    status: 200,
    description: 'Trustees data retrieved successfully',
  })
  async getTrustees(@Query() query: TrusteeQueryDto) {
    return this.service.getTrustees(query);
  }

  /**
   * Get a trustee by ID
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get trustee by ID',
    description: 'Retrieves a specific trustee by their ID. This endpoint is public and does not require authentication.'
  })
  @ApiParam({ name: 'id', description: 'Trustee ID' })
  @ApiResponse({
    status: 200,
    description: 'Trustee data retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Trustee not found',
  })
  async getTrusteeById(@Param('id') id: string) {
    return this.service.getTrusteeById(id);
  }

  /**
   * Create a new trustee
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth("JWT-auth")
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Create a new trustee',
    description: 'Creates a new trustee with image upload. Requires admin authentication.'
  })
  @ApiBody({
    description: 'Trustee data with image upload',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Trustee image file (optional)',
        },
        popupImg: {
          type: 'string',
          format: 'binary',
          description: 'Trustee popup image file (optional)',
        },
        title: {
          type: 'string',
          description: 'Trustee name',
        },
        desig: {
          type: 'string',
          description: 'Trustee designation',
        },
        popupdesc: {
          type: 'string',
          description: 'Trustee description',
        },
        link: {
          type: 'string',
          description: 'Social media profile link (optional)',
        },
        socialMedia: {
          type: 'string',
          description: 'Social media platform (optional)',
        },
        order: {
          type: 'number',
          description: 'Order for sorting trustees (optional)',
        },
        active: {
          type: 'boolean',
          description: 'Whether the trustee is active (optional)',
        },
      },
      required: ['title', 'desig', 'popupdesc'],
    },
  })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'popupImg', maxCount: 1 },
  ]))
  @ApiResponse({
    status: 201,
    description: 'Trustee created successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async createTrustee(
    @Body() body: any,
    @UploadedFiles() files: { image?: Array<Multer.File>, popupImg?: Array<Multer.File> }
  ) {
    // Parse form data properly
    const createTrusteeDto: CreateTrusteeDto = {
      ...body,
      // Parse numeric fields
      order: body.order ? parseInt(body.order, 10) : undefined,
      // Parse active as boolean if provided
      active: body.active === undefined ? undefined : body.active === 'true' || body.active === true
    };

    return this.service.createTrustee(
      createTrusteeDto,
      files.image?.[0],
      files.popupImg?.[0]
    );
  }

  /**
   * Update a trustee by ID
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth("JWT-auth")
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Update a trustee',
    description: 'Updates an existing trustee by ID with optional image upload. Requires admin authentication.'
  })
  @ApiParam({ name: 'id', description: 'Trustee ID' })
  @ApiBody({
    description: 'Trustee data with optional image upload',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Trustee image file (optional)',
        },
        popupImg: {
          type: 'string',
          format: 'binary',
          description: 'Trustee popup image file (optional)',
        },
        title: {
          type: 'string',
          description: 'Trustee name (optional)',
        },
        desig: {
          type: 'string',
          description: 'Trustee designation (optional)',
        },
        popupdesc: {
          type: 'string',
          description: 'Trustee description (optional)',
        },
        link: {
          type: 'string',
          description: 'Social media profile link (optional)',
        },
        socialMedia: {
          type: 'string',
          description: 'Social media platform (optional)',
        },
        order: {
          type: 'number',
          description: 'Order for sorting trustees (optional)',
        },
        active: {
          type: 'boolean',
          description: 'Whether the trustee is active (optional)',
        },
      },
      required: [],
    },
  })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'popupImg', maxCount: 1 },
  ]))
  @ApiResponse({
    status: 200,
    description: 'Trustee updated successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 404,
    description: 'Trustee not found',
  })
  async updateTrustee(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFiles() files: { image?: Array<Multer.File>, popupImg?: Array<Multer.File> }
  ) {
    // Parse form data properly
    const updateTrusteeDto: UpdateTrusteeDto = {};

    // Only add fields that are explicitly provided
    if (body.title !== undefined) updateTrusteeDto.title = body.title;
    if (body.desig !== undefined) updateTrusteeDto.desig = body.desig;
    if (body.popupdesc !== undefined) updateTrusteeDto.popupdesc = body.popupdesc;
    if (body.link !== undefined) updateTrusteeDto.link = body.link;
    if (body.socialMedia !== undefined) updateTrusteeDto.socialMedia = body.socialMedia;

    // Parse numeric fields
    if (body.order !== undefined) {
      updateTrusteeDto.order = parseInt(body.order, 10);
    }

    // Parse active as boolean if provided
    if (body.active !== undefined) {
      updateTrusteeDto.active = body.active === 'true' || body.active === true;
    }

    return this.service.updateTrustee(
      id,
      updateTrusteeDto,
      files.image?.[0],
      files.popupImg?.[0]
    );
  }

  /**
   * Delete a trustee by ID
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth("JWT-auth")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a trustee',
    description: 'Deletes a trustee by ID. Requires admin authentication.'
  })
  @ApiParam({ name: 'id', description: 'Trustee ID' })
  @ApiResponse({
    status: 204,
    description: 'Trustee deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 404,
    description: 'Trustee not found',
  })
  async deleteTrustee(@Param('id') id: string) {
    await this.service.deleteTrustee(id);
  }
}