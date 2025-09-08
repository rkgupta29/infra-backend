import { Module } from '@nestjs/common';
import { HomepageController } from './homepage.controller';
import { HomepageService } from './homepage.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LatestUpdatesController } from './latest-updates.controller';
import { LatestUpdatesService } from './latest-updates.service';
import { AdvocacyController } from './advocacy.controller';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { FileUploadModule } from '../common/file-upload/file-upload.module';

@Module({
  imports: [PrismaModule, FileUploadModule],
  controllers: [
    HomepageController,
    LatestUpdatesController,
    AdvocacyController,
    ContactController,
    LeadsController
  ],
  providers: [
    HomepageService,
    LatestUpdatesService,
    ContactService,
    LeadsService
  ],
  exports: [
    HomepageService,
    LatestUpdatesService,
    ContactService,
    LeadsService
  ],
})
export class HomepageModule { }
