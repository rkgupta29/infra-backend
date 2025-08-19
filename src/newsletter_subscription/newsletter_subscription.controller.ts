import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  Patch,
} from '@nestjs/common';
import { NewsletterService } from './newsletter_subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PaginationDto } from './dto/pagination.dto';
import type { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('Newsletter Subscription')
@Controller('newsletter-subscription')
@ApiExtraModels(CreateSubscriptionDto, PaginationDto)
export class NewsletterSubscriptionController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  @ApiOperation({
    summary: 'Subscribe to the newsletter',
    description: 'Creates a new newsletter subscription for the provided email address.',
  })
  @ApiBody({
    type: CreateSubscriptionDto,
    examples: {
      default: {
        summary: 'Subscribe with email',
        value: {
          email: 'user@example.com',
          source: 'homepage',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Subscription created successfully',
    schema: {
      example: {
        id: 'ckz1q2w3e4r5t6y7u8i9o0p',
        email: 'user@example.com',
        isActive: true,
        subscribedAt: '2024-06-01T12:34:56.789Z',
        unsubscribedAt: null,
        source: 'homepage',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid input or email already subscribed',
    schema: {
      example: {
        statusCode: 400,
        message: 'Email is already subscribed',
        error: 'Bad Request',
      },
    },
  })
  async subscribe(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.newsletterService.subscribe(createSubscriptionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all newsletter subscriptions (paginated)',
    description: 'Returns a paginated list of newsletter subscriptions. Supports search and status filter.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number (1-based)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    example: 'john@',
    description: 'Search term for email',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['active', 'inactive', 'all'],
    example: 'active',
    description: 'Filter by subscription status',
  })
  @ApiOkResponse({
    description: 'Paginated list of newsletter subscriptions',
    schema: {
      example: {
        data: [
          {
            id: 'ckz1q2w3e4r5t6y7u8i9o0p',
            email: 'user@example.com',
            isActive: true,
            subscribedAt: '2024-06-01T12:34:56.789Z',
            unsubscribedAt: null,
            source: 'homepage',
          },
        ],
        total: 1,
        page: 1,
        limit: 10,
      },
    },
  })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.newsletterService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a single newsletter subscription by ID',
    description: 'Returns the details of a newsletter subscription by its unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    example: 'ckz1q2w3e4r5t6y7u8i9o0p',
    description: 'The unique ID of the newsletter subscription',
  })
  @ApiOkResponse({
    description: 'Newsletter subscription found',
    schema: {
      example: {
        id: 'ckz1q2w3e4r5t6y7u8i9o0p',
        email: 'user@example.com',
        isActive: true,
        subscribedAt: '2024-06-01T12:34:56.789Z',
        unsubscribedAt: null,
        source: 'homepage',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Subscription not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Subscription not found',
        error: 'Not Found',
      },
    },
  })
  async findOne(@Param('id') id: string) {
    return this.newsletterService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a newsletter subscription by ID',
    description: 'Deletes a newsletter subscription by its unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    example: 'ckz1q2w3e4r5t6y7u8i9o0p',
    description: 'The unique ID of the newsletter subscription',
  })
  @ApiNoContentResponse({
    description: 'Subscription deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Subscription not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Subscription not found',
        error: 'Not Found',
      },
    },
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.newsletterService.delete(id);
  }

  @Patch(':id/unsubscribe')
  @ApiOperation({
    summary: 'Unsubscribe a newsletter subscription by ID',
    description: 'Marks a newsletter subscription as unsubscribed by its unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    example: 'ckz1q2w3e4r5t6y7u8i9o0p',
    description: 'The unique ID of the newsletter subscription',
  })
  @ApiOkResponse({
    description: 'Subscription unsubscribed successfully',
    schema: {
      example: {
        id: 'ckz1q2w3e4r5t6y7u8i9o0p',
        email: 'user@example.com',
        isActive: false,
        subscribedAt: '2024-06-01T12:34:56.789Z',
        unsubscribedAt: '2024-06-02T10:00:00.000Z',
        source: 'homepage',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Subscription not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Subscription not found',
        error: 'Not Found',
      },
    },
  })
  async unsubscribe(@Param('id') id: string) {
    return this.newsletterService.unsubscribe(id);
  }

  @Get('export/csv')
  @ApiOperation({
    summary: 'Export newsletter subscriptions as CSV',
    description: 'Exports all newsletter subscriptions as a CSV file.',
  })
  @ApiOkResponse({
    description: 'CSV file containing all newsletter subscriptions',
    schema: {
      type: 'string',
      format: 'binary',
      example: 'id,email,isActive,subscribedAt,unsubscribedAt,source\nckz1q2w3e4r5t6y7u8i9o0p,user@example.com,true,2024-06-01T12:34:56.789Z,,homepage\n',
    },
  })
  async exportToCsv(@Res() res: Response) {
    const csv = await this.newsletterService.exportToCsv();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="newsletter_subscriptions.csv"');
    res.send(csv);
  }
}
