import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { SectorsService } from './sectors.service';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles, UserRole } from '../../auth/decorators/roles.decorator';

@ApiTags('Knowledge')
@Controller('knowledge/sectors')
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create a new sector',
    description: 'Creates a new sector for research papers. Requires admin privileges.',
  })
  @ApiResponse({
    status: 201,
    description: 'The sector has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 409, description: 'Sector with this name or slug already exists.' })
  create(@Body() createSectorDto: CreateSectorDto) {
    return this.sectorsService.create(createSectorDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all sectors',
    description: 'Retrieves a list of all sectors for research papers. This endpoint is public.',
  })
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    type: Boolean,
    description: 'If true, returns only active sectors',
  })
  @ApiResponse({
    status: 200,
    description: 'List of sectors retrieved successfully.',
  })
  findAll(@Query('activeOnly') activeOnly?: boolean) {
    return this.sectorsService.findAll(activeOnly === true);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a sector by ID',
    description: 'Retrieves a specific sector by its ID. This endpoint is public.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the sector to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Sector retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Sector not found.' })
  findOne(@Param('id') id: string) {
    return this.sectorsService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiOperation({
    summary: 'Get a sector by slug',
    description: 'Retrieves a specific sector by its slug. This endpoint is public.',
  })
  @ApiParam({
    name: 'slug',
    description: 'The slug of the sector to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Sector retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Sector not found.' })
  findBySlug(@Param('slug') slug: string) {
    return this.sectorsService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update a sector',
    description: 'Updates a specific sector by its ID. Requires admin privileges.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the sector to update',
  })
  @ApiResponse({
    status: 200,
    description: 'Sector updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Sector not found.' })
  @ApiResponse({ status: 409, description: 'Sector with this name or slug already exists.' })
  update(@Param('id') id: string, @Body() updateSectorDto: UpdateSectorDto) {
    return this.sectorsService.update(id, updateSectorDto);
  }

  @Patch(':id/toggle-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Toggle sector status',
    description: 'Toggles the active status of a specific sector. Requires admin privileges.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the sector to toggle status',
  })
  @ApiResponse({
    status: 200,
    description: 'Sector status toggled successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Sector not found.' })
  toggleStatus(@Param('id') id: string) {
    return this.sectorsService.toggleStatus(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete a sector',
    description: 'Deletes a specific sector by its ID. Requires admin privileges.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the sector to delete',
  })
  @ApiResponse({
    status: 204,
    description: 'Sector deleted successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request - Sector is in use by research papers.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Sector not found.' })
  remove(@Param('id') id: string) {
    return this.sectorsService.remove(id);
  }
}
