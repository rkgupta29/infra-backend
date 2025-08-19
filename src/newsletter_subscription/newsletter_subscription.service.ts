import { Injectable, ConflictException, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Prisma } from '@prisma/client';
import { PaginatedResult } from '../types/utils';

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);

  constructor(private prisma: PrismaService) {}

  async subscribe(createSubscriptionDto: CreateSubscriptionDto) {
    const { email, source } = createSubscriptionDto;

    try {
      const existingSubscription = await this.prisma.newsletterSubscription.findUnique({
        where: { email },
      });

      if (existingSubscription) {
        if (existingSubscription.isActive) {
          throw new ConflictException('Email is already subscribed to the newsletter');
        } else {
          const reactivated = await this.prisma.newsletterSubscription.update({
            where: { email },
            data: {
              isActive: true,
              subscribedAt: new Date(),
              unsubscribedAt: null,
              source,
            },
          });
          
          this.logger.log(`Reactivated subscription for ${email}`);
          return reactivated;
        }
      }

      // Create new subscription
      const subscription = await this.prisma.newsletterSubscription.create({
        data: {
          email,
          source,
          isActive: true,
        },
      });

      this.logger.log(`New subscription created for ${email}`);
      return subscription;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      this.logger.error(`Failed to create subscription for ${email}:`, error.message);
      throw error;
    }
  }

  /**
   * Returns a paginated list of newsletter subscriptions.
   */
  async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<any>> {
    const {
      page = 1,
      limit = 10,
      search,
      status = 'all',
    } = paginationDto;

    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.email = {
        contains: search,
        mode: 'insensitive',
      };
    }
    if (status && status !== 'all') {
      where.isActive = status === 'active';
    }

    try {
      const [subscriptions, total] = await Promise.all([
        this.prisma.newsletterSubscription.findMany({
          where,
          skip,
          take: limit,
          select: {
            id: true,
            email: true,
            isActive: true,
            subscribedAt: true,
            unsubscribedAt: true,
            source: true,
          },
        }),
        this.prisma.newsletterSubscription.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data: subscriptions,
        meta: {
          total,
          page,
          limit,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      this.logger.error('Failed to fetch subscriptions:', error.message);
      throw error;
    }
  }

  async findOne(id: string) {
    const subscription = await this.prisma.newsletterSubscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }

    return subscription;
  }

  async delete(id: string) {
    try {
      const subscription = await this.prisma.newsletterSubscription.findUnique({
        where: { id },
      });

      if (!subscription) {
        throw new NotFoundException(`Subscription with ID ${id} not found`);
      }

      await this.prisma.newsletterSubscription.delete({
        where: { id },
      });

      this.logger.log(`Deleted subscription: ${subscription.email}`);
      return { message: 'Subscription deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to delete subscription ${id}:`, error.message);
      throw error;
    }
  }

  async unsubscribe(id: string) {
    try {
      const subscription = await this.prisma.newsletterSubscription.findUnique({
        where: { id },
      });

      if (!subscription) {
        throw new NotFoundException(`Subscription with ID ${id} not found`);
      }

      const updated = await this.prisma.newsletterSubscription.update({
        where: { id },
        data: {
          isActive: false,
          unsubscribedAt: new Date(),
        },
      });

      this.logger.log(`Unsubscribed: ${subscription.email}`);
      return updated;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to unsubscribe ${id}:`, error.message);
      throw error;
    }
  }

  async exportToCsv(): Promise<string> {
    try {
      const subscriptions = await this.prisma.newsletterSubscription.findMany({
        orderBy: { subscribedAt: 'desc' },
        select: {
          email: true,
          isActive: true,
          subscribedAt: true,
          unsubscribedAt: true,
          source: true,
        },
      });

      const headers = ['Email', 'Status', 'Subscribed At', 'Unsubscribed At', 'Source'];
      
      const rows = subscriptions.map(sub => [
        sub.email,
        sub.isActive ? 'Active' : 'Inactive',
        sub.subscribedAt.toISOString(),
        sub.unsubscribedAt ? sub.unsubscribedAt.toISOString() : '',
        sub.source || '',
      ]);
      const csvContent = [headers, ...rows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
      this.logger.log(`Exported ${subscriptions.length} subscriptions to CSV`);
      return csvContent;
    } catch (error) {
      this.logger.error('Failed to export subscriptions to CSV:', error.message);
      throw error;
    }
  }

}