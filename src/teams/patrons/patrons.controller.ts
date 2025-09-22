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
  HttpStatus
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiBearerAuth
} from '@nestjs/swagger';
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
  @ApiOperation({
    summary: 'Create a new patron',
    description: 'Creates a new patron. Requires admin authentication.'
  })
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
  async createPatron(@Body() body: any) {
    // Parse form data properly
    const data: CreatePatronDto = {
      ...body,
      // Parse active as boolean if provided
      active: body.active === undefined ? undefined : body.active === 'true' || body.active === true,
      // Parse order as number if provided
      order: body.order !== undefined ? parseInt(body.order, 10) : undefined
    };

    return this.service.createPatron(data);
  }

  /**
   * Update a patron by ID
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update a patron',
    description: 'Updates an existing patron by ID. Requires admin authentication.'
  })
  @ApiParam({ name: 'id', description: 'Patron ID' })
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
  async updatePatron(@Param('id') id: string, @Body() body: any) {
    // Parse form data properly
    const data: UpdatePatronDto = {};

    // Only add fields that are explicitly provided
    if (body.image !== undefined) data.image = body.image;
    if (body.title !== undefined) data.title = body.title;
    if (body.desig !== undefined) data.desig = body.desig;
    if (body.popupImg !== undefined) data.popupImg = body.popupImg;
    if (body.popupdesc !== undefined) data.popupdesc = body.popupdesc;
    if (body.link !== undefined) data.link = body.link;
    if (body.socialMedia !== undefined) data.socialMedia = body.socialMedia;

    // Parse order as number if provided
    if (body.order !== undefined) {
      data.order = parseInt(body.order, 10);
    }

    // Parse active as boolean if provided
    if (body.active !== undefined) {
      data.active = body.active === 'true' || body.active === true;
    }

    return this.service.updatePatron(id, data);
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