import { Controller, Get } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { NewsletterService } from './newsletter.service';

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
    description: 'Retrieves static newsletter content. This endpoint is public and does not require authentication.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Newsletter content retrieved successfully',
    schema: {
      example: {
        articles: [
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
      }
    }
  })
  async getNewsletter() {
    return this.service.getNewsletter();
  }
}
