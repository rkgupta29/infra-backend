import { 
  Controller, 
  Get, 
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import type { Multer } from 'multer';

@ApiTags('Knowledge')
@Controller('knowledge/conversation')
export class ConversationController {
  constructor(private readonly service: ConversationService) {}

  /**
   * Create a new conversation
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create a new conversation',
    description: 'Creates a new conversation with image upload. Requires admin privileges.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imageFile: {
          type: 'string',
          format: 'binary',
          description: 'Image file for the conversation',
        },
        name: {
          type: 'string',
          description: 'Name of the person in the conversation',
        },
        title: {
          type: 'string',
          description: 'Title or designation of the person',
        },
        desc: {
          type: 'string',
          description: 'Description or topic of the conversation',
        },
        videoLink: {
          type: 'string',
          description: 'YouTube video link for the conversation',
        },
        date: {
          type: 'string',
          description: 'Date of the conversation',
        },
        active: {
          type: 'boolean',
          description: 'Whether the conversation is active',
        },
      },
      required: ['imageFile', 'name', 'title', 'desc', 'videoLink', 'date'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The conversation has been successfully created.',
  })
  @UseInterceptors(FileInterceptor('imageFile'))
  async create(
    @Body() body: any,
    @UploadedFile() imageFile?: Multer.File,
  ) {
    // Parse form data properly
    const createConversationDto: CreateConversationDto = {
      name: body.name,
      title: body.title,
      desc: body.desc,
      videoLink: body.videoLink,
      date: body.date,
      // Parse active as boolean
      active: body.active === 'true' || body.active === true,
    };
    
    return this.service.create(createConversationDto, imageFile);
  }

  /**
   * Get all conversations
   * This endpoint is public
   */
  @Get()
  @ApiOperation({
    summary: 'Get all conversations',
    description: 'Retrieves a list of all conversations with pagination. This endpoint is public.',
  })
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    type: Boolean,
    description: 'If true, returns only active conversations',
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
    description: 'List of conversations retrieved successfully.',
  })
  async findAll(
    @Query('activeOnly') activeOnly?: boolean,
    @Query() paginationDto?: PaginationDto,
  ) {
    const { page = 1, limit = 10 } = paginationDto || {};
    return this.service.findAll(page, limit, activeOnly === true);
  }

  /**
   * Get a specific conversation by ID
   * This endpoint is public
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get a conversation by ID',
    description: 'Retrieves a specific conversation by its ID. This endpoint is public.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the conversation to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Conversation retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Conversation not found.' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /**
   * Update a conversation
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update a conversation',
    description: 'Updates a specific conversation by its ID. Requires admin privileges.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imageFile: {
          type: 'string',
          format: 'binary',
          description: 'Image file for the conversation (optional)',
        },
        name: {
          type: 'string',
          description: 'Name of the person in the conversation',
        },
        title: {
          type: 'string',
          description: 'Title or designation of the person',
        },
        desc: {
          type: 'string',
          description: 'Description or topic of the conversation',
        },
        videoLink: {
          type: 'string',
          description: 'YouTube video link for the conversation',
        },
        date: {
          type: 'string',
          description: 'Date of the conversation',
        },
        active: {
          type: 'boolean',
          description: 'Whether the conversation is active',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the conversation to update',
  })
  @ApiResponse({
    status: 200,
    description: 'Conversation updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Conversation not found.' })
  @UseInterceptors(FileInterceptor('imageFile'))
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFile() imageFile?: Multer.File,
  ) {
    // Parse form data properly
    const updateConversationDto: UpdateConversationDto = {};
    
    if (body.name) updateConversationDto.name = body.name;
    if (body.title) updateConversationDto.title = body.title;
    if (body.desc) updateConversationDto.desc = body.desc;
    if (body.videoLink) updateConversationDto.videoLink = body.videoLink;
    if (body.date) updateConversationDto.date = body.date;
    if (body.active !== undefined) {
      updateConversationDto.active = body.active === 'true' || body.active === true;
    }
    
    return this.service.update(id, updateConversationDto, imageFile);
  }

  /**
   * Toggle conversation status
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Patch(':id/toggle-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Toggle conversation status',
    description: 'Toggles the active status of a specific conversation. Requires admin privileges.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the conversation to toggle status',
  })
  @ApiResponse({
    status: 200,
    description: 'Conversation status toggled successfully.',
  })
  @ApiResponse({ status: 404, description: 'Conversation not found.' })
  async toggleStatus(@Param('id') id: string) {
    return this.service.toggleStatus(id);
  }

  /**
   * Delete a conversation
   * This endpoint requires authentication (ADMIN or SUPERADMIN)
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete a conversation',
    description: 'Deletes a specific conversation by its ID. Requires admin privileges.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the conversation to delete',
  })
  @ApiResponse({
    status: 204,
    description: 'Conversation deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Conversation not found.' })
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  /**
   * Legacy endpoint to get all conversations
   * This endpoint returns static conversation data
   */
  @Get('legacy')
  @ApiOperation({ 
    summary: 'Get all conversations (legacy)',
    description: 'Retrieves static conversation data. This endpoint is public and does not require authentication.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Conversation data retrieved successfully',
  })
  async getConversation() {
    return this.service.getConversation();
  }
}