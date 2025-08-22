import { Controller, Get } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { TrusteesService } from './trustees.service';

@ApiTags('Teams')
@Controller('teams/trustees')
export class TrusteesController {
  constructor(private readonly service: TrusteesService) {}

  /**
   * Get all trustees
   * This endpoint returns static trustees data
   */
  @Get()
  @ApiOperation({ 
    summary: 'Get all trustees',
    description: 'Retrieves static trustees data. This endpoint is public and does not require authentication.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Trustees data retrieved successfully',
  })
  async getTrustees() {
    return this.service.getTrustees();
  }
}
