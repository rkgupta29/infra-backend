import { Controller, Get } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { AdvisorsService } from './advistors.service';

@ApiTags('Teams')
@Controller('teams/advisors')
export class AdvisorsController {
  constructor(private readonly service: AdvisorsService) {}

  /**
   * Get all patrons
   * This endpoint returns static patrons data
   */
  @Get()
  @ApiOperation({ 
    summary: 'Get all advisors',
    description: 'Retrieves static advisors data. This endpoint is public and does not require authentication.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Advisors data retrieved successfully',
  })
  async getAdvisors() {
    return this.service.getAdvisors();
  }
}
