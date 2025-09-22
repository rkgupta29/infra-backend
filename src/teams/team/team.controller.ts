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
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Create a new team member',
    description: 'Creates a new team member with image upload. Requires admin authentication.'
  })
  @ApiBody({
    description: 'Team member data with image upload',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Team member image file (optional)',
        },
        popupImg: {
          type: 'string',
          format: 'binary',
          description: 'Team member popup image file (optional)',
        },
        title: {
          type: 'string',
          description: 'Team member name',
        },
        desig: {
          type: 'string',
          description: 'Team member designation',
        },
        popupdesc: {
          type: 'string',
          description: 'Team member description',
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
          description: 'Order for sorting team members (optional)',
        },
        active: {
          type: 'boolean',
          description: 'Whether the team member is active (optional)',
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
  async createTeamMember(
    @Body() body: any,
    @UploadedFiles() files: { image?: Array<Multer.File>, popupImg?: Array<Multer.File> }
  ) {
    // Parse form data properly
    const createTeamDto: CreateTeamDto = {
      ...body,
      // Parse numeric fields
      order: body.order ? parseInt(body.order, 10) : undefined,
      // Parse active as boolean if provided
      active: body.active === undefined ? undefined : body.active === 'true' || body.active === true
    };

    return this.service.createTeamMember(
      createTeamDto,
      files.image?.[0],
      files.popupImg?.[0]
    );
  }

  /**
   * Update a team member by ID
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiBearerAuth("JWT-auth")
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Update a team member',
    description: 'Updates an existing team member by ID with optional image upload. Requires admin authentication.'
  })
  @ApiParam({ name: 'id', description: 'Team member ID' })
  @ApiBody({
    description: 'Team member data with optional image upload',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Team member image file (optional)',
        },
        popupImg: {
          type: 'string',
          format: 'binary',
          description: 'Team member popup image file (optional)',
        },
        title: {
          type: 'string',
          description: 'Team member name (optional)',
        },
        desig: {
          type: 'string',
          description: 'Team member designation (optional)',
        },
        popupdesc: {
          type: 'string',
          description: 'Team member description (optional)',
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
          description: 'Order for sorting team members (optional)',
        },
        active: {
          type: 'boolean',
          description: 'Whether the team member is active (optional)',
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
  async updateTeamMember(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFiles() files: { image?: Array<Multer.File>, popupImg?: Array<Multer.File> }
  ) {
    // Parse form data properly
    const updateTeamDto: UpdateTeamDto = {};

    // Only add fields that are explicitly provided
    if (body.title !== undefined) updateTeamDto.title = body.title;
    if (body.desig !== undefined) updateTeamDto.desig = body.desig;
    if (body.popupdesc !== undefined) updateTeamDto.popupdesc = body.popupdesc;
    if (body.link !== undefined) updateTeamDto.link = body.link;
    if (body.socialMedia !== undefined) updateTeamDto.socialMedia = body.socialMedia;

    // Parse numeric fields
    if (body.order !== undefined) {
      updateTeamDto.order = parseInt(body.order, 10);
    }

    // Parse active as boolean if provided
    if (body.active !== undefined) {
      updateTeamDto.active = body.active === 'true' || body.active === true;
    }

    return this.service.updateTeamMember(
      id,
      updateTeamDto,
      files.image?.[0],
      files.popupImg?.[0]
    );
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