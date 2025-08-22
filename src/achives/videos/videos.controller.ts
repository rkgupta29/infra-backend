import { Controller, Get } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { VideosService } from './videos.service';

@ApiTags('Archives')
@Controller('archives/videos')
export class VideosController {
  constructor(private readonly service: VideosService) {}

  /**
   * Get all videos
   * This endpoint returns static videos data
   */
  @Get()
  @ApiOperation({ 
    summary: 'Get all videos of archives',
    description: 'Retrieves static videos data. This endpoint is public and does not require authentication.'
  })
  @ApiResponse({ 
    status: 200, 
        description: 'Videos data retrieved successfully',
  })
  async getVideos() {
    return this.service.getVideos();
  }
}
