import { Controller, Get } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { FellowService } from './fellow.service';

@ApiTags('Teams')
@Controller('teams/fellow')
export class FellowController {
  constructor(private readonly service: FellowService) {}

  /**
   * Get all patrons
   * This endpoint returns static patrons data
   */
  @Get()
  @ApiOperation({ 
    summary: 'Get all fellow',
    description: 'Retrieves static fellow data. This endpoint is public and does not require authentication.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Fellow data retrieved successfully',
  })
  async getFellow() {
    return this.service.getFellow();
  }
}
