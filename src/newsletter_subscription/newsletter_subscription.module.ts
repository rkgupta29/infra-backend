import { Module } from '@nestjs/common';
import { NewsletterSubscriptionController } from './newsletter_subscription.controller';
import { NewsletterService } from './newsletter_subscription.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NewsletterSubscriptionController],
  providers: [NewsletterService],
  exports: [NewsletterService],
})
export class NewsletterSubscriptionModule {}