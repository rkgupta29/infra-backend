import { Module } from '@nestjs/common';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FileUploadModule } from '../common/file-upload/file-upload.module';
import { ArchiveTabsController } from './archive-tabs.controller';
import { ArchiveTabsService } from './archive-tabs.service';

@Module({
  imports: [PrismaModule, FileUploadModule],
  controllers: [NewsletterController, ArchiveTabsController],
  providers: [NewsletterService, ArchiveTabsService],
  exports: [NewsletterService, ArchiveTabsService],
})
export class NewsletterModule { }