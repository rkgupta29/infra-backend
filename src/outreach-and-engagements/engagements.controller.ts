import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiBody
} from '@nestjs/swagger';
import { EngagementsService } from './engagements.service';
import { CreateEngagementDto, UpdateEngagementDto, QueryEngagementsDto, EventResponseDto, PaginatedEventsResponseDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Outreach and Engagements')
@Controller('outreach-and-engagements')
export class EngagementsController {
  constructor(private readonly engagementsService: EngagementsService) { }

  /**
   * Get all engagements with optional filtering and pagination
   */
  @Get()
  @ApiOperation({
    summary: 'Get all engagements',
    description: 'Retrieves all engagements with optional filtering and pagination. Returns events in the new Event schema format.'
  })
  @ApiResponse({
    status: 200,
    description: 'Engagements retrieved successfully with Event schema format',
    type: PaginatedEventsResponseDto,
  })
  async findAll(@Query() queryParams: QueryEngagementsDto) {
    return this.engagementsService.findAll(queryParams);
  }

  /**
   * Get all years that have engagements
   */
  @Get('years')
  @ApiOperation({
    summary: 'Get all years with engagements',
    description: 'Retrieves all years that have at least one engagement.'
  })
  @ApiResponse({
    status: 200,
    description: 'Years retrieved successfully',
  })
  async getYears() {
    return this.engagementsService.getYears();
  }

  /**
   * Get the primary event (closest upcoming event)
   */
  @Get('primary')
  @ApiOperation({
    summary: 'Get primary event',
    description: 'Retrieves the closest upcoming event or most recent past event if no upcoming events exist. Returns event in the new Event schema format.'
  })
  @ApiResponse({
    status: 200,
    description: 'Primary event retrieved successfully in Event schema format',
    schema: {
      type: 'object',
      properties: {
        event: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            date: { type: 'string', example: '2025-09-19' },
            dayTime: { type: 'string', example: 'Monday, 10:00 AM - 12:00 PM' },
            meetingType: { type: 'string', example: 'Webinar | Workshop | Event | Meeting' },
            desc: { type: 'string', example: 'Short summary of the event' },
            ctaText: { type: 'string', example: 'Register Now' },
            details: {
              type: 'object',
              properties: {
                images: { type: 'array', items: { type: 'object' } },
                date: { type: 'string' },
                content: { type: 'string' },
                cta: { type: 'object' }
              }
            }
          }
        },
        type: { type: 'string', enum: ['upcoming', 'recent'] },
        lastUpdated: { type: 'string' }
      }
    }
  })
  async getPrimaryEvent() {
    return this.engagementsService.getPrimaryEvent();
  }

  /**
   * Get engagements for a specific year
   */
  @Get('year/:year')
  @ApiOperation({
    summary: 'Get engagements by year',
    description: 'Retrieves all engagements for a specific year.'
  })
  @ApiParam({
    name: 'year',
    description: 'Year to filter by (e.g., 2025)',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Engagements retrieved successfully',
  })
  async findByYear(@Param('year', ParseIntPipe) year: number) {
    return this.engagementsService.findByYear(year);
  }

  /**
   * Get engagements for a specific month and year
   */
  @Get('year/:year/month/:month')
  @ApiOperation({
    summary: 'Get engagements by month and year',
    description: 'Retrieves all engagements for a specific month and year.'
  })
  @ApiParam({
    name: 'year',
    description: 'Year to filter by (e.g., 2025)',
    type: Number,
  })
  @ApiParam({
    name: 'month',
    description: 'Month to filter by (1-12)',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Engagements retrieved successfully',
  })
  async findByMonth(
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number,
  ) {
    return this.engagementsService.findByMonth(year, month);
  }

  /**
   * Get a specific engagement by ID
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get engagement by ID',
    description: 'Retrieves a specific engagement by its ID.'
  })
  @ApiParam({
    name: 'id',
    description: 'Engagement ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Engagement retrieved successfully in Event schema format',
    type: EventResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Engagement not found',
  })
  async findOne(@Param('id') id: string) {
    return this.engagementsService.findOne(id);
  }

  /**
   * Create a new engagement
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: 'Create a new engagement',
    description: 'Creates a new engagement. Requires authentication.'
  })
  @ApiBody({ type: CreateEngagementDto })
  @ApiResponse({
    status: 201,
    description: 'Engagement created successfully in Event schema format',
    type: EventResponseDto,
  })
  async create(@Body() createEngagementDto: CreateEngagementDto) {
    return this.engagementsService.create(createEngagementDto);
  }

  /**
   * Update an engagement
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: 'Update an engagement',
    description: 'Updates an existing engagement. Requires authentication.'
  })
  @ApiParam({
    name: 'id',
    description: 'Engagement ID',
  })
  @ApiBody({ type: UpdateEngagementDto })
  @ApiResponse({
    status: 200,
    description: 'Engagement updated successfully in Event schema format',
    type: EventResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Engagement not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateEngagementDto: UpdateEngagementDto,
  ) {
    return this.engagementsService.update(id, updateEngagementDto);
  }

  /**
   * Delete an engagement
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: 'Delete an engagement',
    description: 'Deletes an engagement. Requires authentication.'
  })
  @ApiParam({
    name: 'id',
    description: 'Engagement ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Engagement deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Engagement not found',
  })
  async remove(@Param('id') id: string) {
    return this.engagementsService.remove(id);
  }
}