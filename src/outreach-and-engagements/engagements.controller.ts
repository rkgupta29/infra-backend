import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EngagementsService } from './engagements.service';

@ApiTags('Outreach and Engagements')
@Controller('outreach-and-engagements')
export class EngagementsController {
  constructor(private readonly engagementsService: EngagementsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all engagements',
    description: 'Retrieves a list of all outreach and engagement items.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all engagements',
    schema: {
      example: [
        {
          id: 1,
          title: 'Engagement 1',
          description: 'Description for engagement 1',
          primary: false,
        },
        {
          id: 2,
          title: 'Engagement 2',
          description: 'Description for engagement 2',
          primary: true,
        },
      ],
    },
  })
  async getAllEngagements() {
    return this.engagementsService.allEngagements();
  }

  @Get('primary')
  @ApiOperation({
    summary: 'Get primary engagement',
    description: 'Retrieves the primary outreach and engagement item.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Primary engagement',
    schema: {
      example: {
        id: 2,
        title: 'Engagement 2',
        description: 'Description for engagement 2',
        primary: true,
      },
    },
  })
  async getPrimaryEngagement() {
    return this.engagementsService.primaryEngagement();
  }
}
