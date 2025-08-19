import { Controller, Get, Query } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiTags,
  ApiQuery
} from '@nestjs/swagger';
import { MediaCoverageService } from './media-coverage.service';

@ApiTags('Media Coverage')
@Controller('media-coverage')
export class MediaCoverageController {
  constructor(private readonly service: MediaCoverageService) {}

  /**
   * Get company media coverage and news mentions
   * This endpoint returns company news, press releases, and media mentions
   */
  @Get()
  @ApiOperation({ 
    summary: 'Get company media coverage',
    description: 'Retrieves company news, press releases, and media mentions with pagination and search. This endpoint is public and does not require authentication.'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination (default: 1)',
    type: Number,
    example: 1
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page (default: 10, max: 50)',
    type: Number,
    example: 10
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search term to filter by title, description, or category',
    type: String,
    example: 'infrastructure'
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Filter by specific category',
    type: String,
    example: 'News'
  })

  @ApiResponse({ 
    status: 200, 
    description: 'Media coverage data retrieved successfully',
    schema: {
      example: {
        data: [
          {
            id: 50,
            img: "/assets/archive/newsAndMedia/coal.jpg",
            category: "News",
            title: "Vinayak Chatterjee",
            sectors: "",
            date: "July 18,2025",
            description: "Coal, Clean, Air and a Welcome Resolution",
            link: "/assets/pdf/coalClean.pdf",
          }
        ],
        meta: {
          total: 15,
          page: 1,
          limit: 10,
          totalPages: 2,
          hasNext: true,
          hasPrev: false
        }
      }
    }
  })
  async getMediaCoverage(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    return this.service.getMediaCoverage({
      page: Math.max(1, page),
      limit: Math.min(50, Math.max(1, limit)),
      search,
      category,
    });
  }
}
