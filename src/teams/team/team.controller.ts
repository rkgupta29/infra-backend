import { Controller, Get } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { TeamService } from './team.service';

@ApiTags('Teams')
@Controller('teams/team')
export class TeamController {
  constructor(private readonly service: TeamService) {}

  /**
   * Get all patrons
   * This endpoint returns static patrons data
   */
  @Get()
  @ApiOperation({ 
    summary: 'Get all team',
    description: 'Retrieves static team data. This endpoint is public and does not require authentication.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Team data retrieved successfully',
  })
  async getTeam() {
    return this.service.getTeam();
  }
}
