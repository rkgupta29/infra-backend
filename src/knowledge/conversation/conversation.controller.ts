import { Controller, Get } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { ConversationService } from './conversation.service';

@ApiTags('Knowledge')
@Controller('knowledge/conversation')
export class ConversationController {
  constructor(private readonly service: ConversationService) {}

  /**
   * Get all patrons
   * This endpoint returns static patrons data
   */
  @Get()
  @ApiOperation({ 
    summary: 'Get all conversation',
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
