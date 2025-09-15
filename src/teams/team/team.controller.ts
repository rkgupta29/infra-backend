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
import { TeamService } from './team.service';
import { CreateTeamDto, UpdateTeamDto, TeamQueryDto } from './dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';

@ApiTags('Teams')
@Controller('teams/team')
export class TeamController {
  constructor(private readonly service: TeamService) { }

  /**
   * Get all team members with pagination and filtering
   */
  @Get()
  @ApiOperation({
    summary: 'Get all team members',
    description: 'Retrieves team data with pagination and filtering options. This endpoint is public and does not require authentication.'
  })
  @ApiResponse({
    status: 200,
    description: 'Team data retrieved successfully',
  })
  async getTeam(@Query() query: TeamQueryDto) {
    return this.service.getTeam(query);
  }

  /**
   * Get a team member by ID
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get team member by ID',
    description: 'Retrieves a specific team member by their ID. This endpoint is public and does not require authentication.'
  })
  @ApiParam({ name: 'id', description: 'Team member ID' })
  @ApiResponse({
    status: 200,
    description: 'Team member data retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Team member not found',
  })
  async getTeamMemberById(@Param('id') id: string) {
    return this.service.getTeamMemberById(id);
  }

  /**
   * Create a new team member
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: 'Create a new team member',
    description: 'Creates a new team member. Requires admin authentication.'
  })
  @ApiResponse({
    status: 201,
    description: 'Team member created successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async createTeamMember(@Body() data: CreateTeamDto) {
    return this.service.createTeamMember(data);
  }

  /**
   * Update a team member by ID
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: 'Update a team member',
    description: 'Updates an existing team member by ID. Requires admin authentication.'
  })
  @ApiParam({ name: 'id', description: 'Team member ID' })
  @ApiResponse({
    status: 200,
    description: 'Team member updated successfully',
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
    description: 'Team member not found',
  })
  async updateTeamMember(@Param('id') id: string, @Body() data: UpdateTeamDto) {
    return this.service.updateTeamMember(id, data);
  }

  /**
   * Delete a team member by ID
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth("JWT-auth")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a team member',
    description: 'Deletes a team member by ID. Requires admin authentication.'
  })
  @ApiParam({ name: 'id', description: 'Team member ID' })
  @ApiResponse({
    status: 204,
    description: 'Team member deleted successfully',
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
    description: 'Team member not found',
  })
  async deleteTeamMember(@Param('id') id: string) {
    await this.service.deleteTeamMember(id);
  }
}