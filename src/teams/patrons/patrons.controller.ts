import { Controller, Get } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { PatronsService } from './patrons.service';

@ApiTags('Teams')
@Controller('teams/patrons')
export class PatronsController {
  constructor(private readonly service: PatronsService) {}

  /**
   * Get all patrons
   * This endpoint returns static patrons data
   */
  @Get()
  @ApiOperation({ 
    summary: 'Get all patrons',
    description: 'Retrieves static patrons data. This endpoint is public and does not require authentication.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Patrons data retrieved successfully',
  })
  async getPatrons() {
    return this.service.getPatrons();
  }
}
