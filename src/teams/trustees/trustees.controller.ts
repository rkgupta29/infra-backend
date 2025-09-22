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
  ApiBearerAuth
} from '@nestjs/swagger';
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
  @ApiOperation({
    summary: 'Create a new trustee',
    description: 'Creates a new trustee in the database. Requires admin authentication.'
  })
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
  async createTrustee(@Body() data: CreateTrusteeDto) {
    return this.service.createTrustee(data);
  }

  /**
   * Update a trustee by ID
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: 'Update a trustee',
    description: 'Updates an existing trustee in the database by ID. Requires admin authentication.'
  })
  @ApiParam({ name: 'id', description: 'Trustee ID' })
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
  async updateTrustee(@Param('id') id: string, @Body() data: UpdateTrusteeDto) {
    return this.service.updateTrustee(id, data);
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