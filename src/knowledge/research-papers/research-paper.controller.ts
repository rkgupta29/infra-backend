import { Controller, Get } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { ResearchPapersService } from './research-papers.service';

@ApiTags('Knowledge')
@Controller('knowledge/research-papers')
export class ResearchPapersController {
  constructor(private readonly service: ResearchPapersService) {}

  /**
   * Get all patrons
   * This endpoint returns static patrons data
   */
  @Get()
  @ApiOperation({ 
    summary: 'Get all research papers',
    description: 'Retrieves static research papers data. This endpoint is public and does not require authentication.'
  })
  @ApiResponse({ 
    status: 200, 
      description: 'Research papers data retrieved successfully',
  })
  async getResearchPapers() {
    return this.service.getResearchPapers();
  }
}
