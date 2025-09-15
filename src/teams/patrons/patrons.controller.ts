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
  async createPatron(@Body() data: CreatePatronDto) {
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
  async updatePatron(@Param('id') id: string, @Body() data: UpdatePatronDto) {
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