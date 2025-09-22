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
  ApiQuery,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import { PatronsService } from './patrons.service';
import { CreatePatronDto, UpdatePatronDto, PatronQueryDto } from './dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';

@ApiTags('Teams')
@Controller('teams/patrons')
export class PatronsController {
  constructor(private readonly service: PatronsService) { }

  /**
   * Get all patrons with pagination and filtering
   */
  @Get()
  @ApiOperation({
    summary: 'Get all patrons',
    description: 'Retrieves patrons data with pagination and filtering options. This endpoint is public and does not require authentication.'
  })
  @ApiResponse({
    status: 200,
    description: 'Patrons data retrieved successfully',
  })
  async getPatrons(@Query() query: PatronQueryDto) {
    return this.service.getPatrons(query);
  }

  /**
   * Get a patron by ID
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get patron by ID',
    description: 'Retrieves a specific patron by their ID. This endpoint is public and does not require authentication.'
  })
  @ApiParam({ name: 'id', description: 'Patron ID' })
  @ApiResponse({
    status: 200,
    description: 'Patron data retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Patron not found',
  })
  async getPatronById(@Param('id') id: string) {
    return this.service.getPatronById(id);
  }

  /**
   * Create a new patron
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Create a new patron',
    description: 'Creates a new patron with image upload. Requires admin authentication.'
  })
  @ApiBody({
    description: 'Patron data with image upload',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Patron image file (optional)',
        },
        popupImg: {
          type: 'string',
          format: 'binary',
          description: 'Patron popup image file (optional)',
        },
        title: {
          type: 'string',
          description: 'Patron name',
        },
        desig: {
          type: 'string',
          description: 'Patron designation',
        },
        popupdesc: {
          type: 'string',
          description: 'Patron description',
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
          description: 'Order for sorting patrons (optional)',
        },
        active: {
          type: 'boolean',
          description: 'Whether the patron is active (optional)',
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
    description: 'Patron created successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async createPatron(
    @Body() body: any,
    @UploadedFiles() files: { image?: Array<Multer.File>, popupImg?: Array<Multer.File> }
  ) {
    // Parse form data properly
    const createPatronDto: CreatePatronDto = {
      ...body,
      // Parse numeric fields
      order: body.order ? parseInt(body.order, 10) : undefined,
      // Parse active as boolean if provided
      active: body.active === undefined ? undefined : body.active === 'true' || body.active === true
    };

    return this.service.createPatron(
      createPatronDto,
      files.image?.[0],
      files.popupImg?.[0]
    );
  }

  /**
   * Update a patron by ID
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Update a patron',
    description: 'Updates an existing patron by ID with optional image upload. Requires admin authentication.'
  })
  @ApiParam({ name: 'id', description: 'Patron ID' })
  @ApiBody({
    description: 'Patron data with optional image upload',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Patron image file (optional)',
        },
        popupImg: {
          type: 'string',
          format: 'binary',
          description: 'Patron popup image file (optional)',
        },
        title: {
          type: 'string',
          description: 'Patron name (optional)',
        },
        desig: {
          type: 'string',
          description: 'Patron designation (optional)',
        },
        popupdesc: {
          type: 'string',
          description: 'Patron description (optional)',
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
          description: 'Order for sorting patrons (optional)',
        },
        active: {
          type: 'boolean',
          description: 'Whether the patron is active (optional)',
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
    description: 'Patron updated successfully',
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
    description: 'Patron not found',
  })
  async updatePatron(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFiles() files: { image?: Array<Multer.File>, popupImg?: Array<Multer.File> }
  ) {
    // Parse form data properly
    const updatePatronDto: UpdatePatronDto = {};

    // Only add fields that are explicitly provided
    if (body.title !== undefined) updatePatronDto.title = body.title;
    if (body.desig !== undefined) updatePatronDto.desig = body.desig;
    if (body.popupdesc !== undefined) updatePatronDto.popupdesc = body.popupdesc;
    if (body.link !== undefined) updatePatronDto.link = body.link;
    if (body.socialMedia !== undefined) updatePatronDto.socialMedia = body.socialMedia;

    // Parse numeric fields
    if (body.order !== undefined) {
      updatePatronDto.order = parseInt(body.order, 10);
    }

    // Parse active as boolean if provided
    if (body.active !== undefined) {
      updatePatronDto.active = body.active === 'true' || body.active === true;
    }

    return this.service.updatePatron(
      id,
      updatePatronDto,
      files.image?.[0],
      files.popupImg?.[0]
    );
  }

  /**
   * Delete a patron by ID
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a patron',
    description: 'Deletes a patron by ID. Requires admin authentication.'
  })
  @ApiParam({ name: 'id', description: 'Patron ID' })
  @ApiResponse({
    status: 204,
    description: 'Patron deleted successfully',
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
    description: 'Patron not found',
  })
  async deletePatron(@Param('id') id: string) {
    await this.service.deletePatron(id);
  }
}