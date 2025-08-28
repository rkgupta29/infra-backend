import { Controller, Get, Query } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiTags,
  ApiQuery
} from '@nestjs/swagger';
import { NewsletterService } from './newsletter.service';
import { PaginationDto } from './dto/pagination.dto';

@ApiTags('Archives')
@Controller('archives/newsletter')
export class NewsletterController {
  constructor(private readonly service: NewsletterService) {}

  /**
   * Get newsletter content
   * This endpoint returns static newsletter content
   */
  @Get()
  @ApiOperation({ 
    summary: 'Get newsletter content',
    description: 'Retrieves paginated newsletter content. This endpoint is public and does not require authentication.'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page (default: 10, max: 100)',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Newsletter content retrieved successfully',
    schema: {
      example: {
        data: [
          {
            id: 27,
            img: "/assets/archive/newsletter/agustNewsletter.png",
            category: "Volume 27",
            title: "",
            sectors: "",
            date: "August 2025",
            description:
              "TIF reaches out to stakeholders",
            link: "/assets/pdf/augustNewsletter.pdf",
          },
        ],
        meta: {
          total: 27,
          page: 1,
          limit: 10,
          totalPages: 3,
          hasNext: true,
          hasPrev: false,
        }
      }
    }
  })
  async getNewsletter(@Query() paginationDto: PaginationDto) {
    return this.service.getNewsletter(paginationDto);
  }
}
