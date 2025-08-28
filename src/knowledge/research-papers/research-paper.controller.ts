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
import { ResearchPapersService } from './research-papers.service';
import { CreateResearchPaperDto } from './dto/create-research-paper.dto';
import { UpdateResearchPaperDto } from './dto/update-research-paper.dto';
import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles, UserRole } from '../../auth/decorators/roles.decorator';

@ApiTags('Knowledge')
@Controller('knowledge/research-papers')
export class ResearchPapersController {
  constructor(private readonly service: ResearchPapersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new research paper',
    description: 'Creates a new research paper. Requires admin privileges.',
  })
  @ApiResponse({
    status: 201,
    description: 'The research paper has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createResearchPaperDto: CreateResearchPaperDto) {
    return this.service.create(createResearchPaperDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all research papers',
    description: 'Retrieves a list of all research papers. This endpoint is public.',
  })
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    type: Boolean,
    description: 'If true, returns only active research papers',
  })
  @ApiQuery({
    name: 'sectorId',
    required: false,
    type: String,
    description: 'Filter research papers by sector ID',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (starts from 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'List of research papers retrieved successfully.',
  })
  findAll(
    @Query('activeOnly') activeOnly?: boolean,
    @Query('sectorId') sectorId?: string,
    @Query() paginationDto?: PaginationDto,
  ) {
    const { page = 1, limit = 10 } = paginationDto || {};
    return this.service.findAll(activeOnly === true, sectorId, page, limit);
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Get a research paper by ID',
    description: 'Retrieves a specific research paper by its ID. This endpoint is public.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the research paper to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Research paper retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Research paper not found.' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('by-sector/:sectorId')
  @ApiOperation({
    summary: 'Get research papers by sector',
    description: 'Retrieves research papers filtered by sector ID. This endpoint is public.',
  })
  @ApiParam({
    name: 'sectorId',
    description: 'The ID of the sector to filter by',
  })
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    type: Boolean,
    description: 'If true, returns only active research papers',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (starts from 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Research papers retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Sector not found.' })
  getResearchPapersBySector(
    @Param('sectorId') sectorId: string,
    @Query('activeOnly') activeOnly?: boolean,
    @Query() paginationDto?: PaginationDto,
  ) {
    const { page = 1, limit = 10 } = paginationDto || {};
    return this.service.getResearchPapersBySector(sectorId, activeOnly === true, page, limit);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a research paper',
    description: 'Updates a specific research paper by its ID. Requires admin privileges.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the research paper to update',
  })
  @ApiResponse({
    status: 200,
    description: 'Research paper updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Research paper not found.' })
  update(@Param('id') id: string, @Body() updateResearchPaperDto: UpdateResearchPaperDto) {
    return this.service.update(id, updateResearchPaperDto);
  }

  @Patch(':id/toggle-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Toggle research paper status',
    description: 'Toggles the active status of a specific research paper. Requires admin privileges.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the research paper to toggle status',
  })
  @ApiResponse({
    status: 200,
    description: 'Research paper status toggled successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Research paper not found.' })
  toggleStatus(@Param('id') id: string) {
    return this.service.toggleStatus(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a research paper',
    description: 'Deletes a specific research paper by its ID. Requires admin privileges.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the research paper to delete',
  })
  @ApiResponse({
    status: 204,
    description: 'Research paper deleted successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Research paper not found.' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}