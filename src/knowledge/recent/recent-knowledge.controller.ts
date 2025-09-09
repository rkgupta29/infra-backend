import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecentKnowledgeService } from './recent-knowledge.service';

@ApiTags('Knowledge')
@Controller('knowledge/recent')
export class RecentKnowledgeController {
    constructor(private readonly recentKnowledgeService: RecentKnowledgeService) { }

    /**
     * Get the most recent research paper, conversation, and blog
     */
    @Get()
    @ApiOperation({
        summary: 'Get recent knowledge content',
        description: 'Retrieves the most recent research paper, conversation, and blog. This endpoint is public and does not require authentication.'
    })
    @ApiResponse({
        status: 200,
        description: 'Recent knowledge content retrieved successfully',
    })
    async getRecentKnowledge() {
        return this.recentKnowledgeService.getRecentKnowledge();
    }
}
