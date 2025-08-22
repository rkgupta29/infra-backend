import { Controller, Get } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { GalleryService } from './gallery.service';

@ApiTags('Archives')
@Controller('archives/gallery')
export class GalleryController {
  constructor(private readonly service: GalleryService) {}

  /**
   * Get all gallery images
   * This endpoint returns static gallery images data
   */
  @Get()
  @ApiOperation({ 
    summary: 'Get all gallery images of archives',
    description: 'Retrieves static gallery data. This endpoint is public and does not require authentication.'
  })
  @ApiResponse({ 
    status: 200, 
      description: 'Gallery data retrieved successfully',
  })
  async getGallery() {
    return this.service.getGallery();
  }
}
