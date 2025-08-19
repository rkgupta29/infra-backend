import { Controller, Get } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { AssociationsService } from './associations.service';

@ApiTags('Associations')
@Controller('associations')
export class AssociationsController {
  constructor(private readonly service: AssociationsService) {}

  /**
   * Get associations data: clientele
   */
  @Get()
  @ApiOperation({ 
    summary: 'Get associations data',
    description: 'Retrieves random association data. This endpoint is public and does not require authentication.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Associations data retrieved successfully',
    schema: {
      example: {
        associations: [
          {
            id: 1,
            name: 'Infrastructure Development Association',
           logoUrl: 'https://www.infrastructure.com/logo.png',
          },
          {
            id: 2,
            name: 'Sustainable Infrastructure Network',
            logoUrl: 'https://www.sustainable.com/logo.png',
          },
        ],
        totalCount: 2,
        lastUpdated: '2024-01-15T10:30:00Z',
      }
    }
  })
  async getAssociations() {
    return this.service.getAssociations();
  }
}
