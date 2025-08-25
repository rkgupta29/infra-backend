import { Module } from '@nestjs/common';
import { HomepageController } from './homepage.controller';
import { HomepageService } from './homepage.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LatestUpdatesController } from './latest-updates.controller';
import { LatestUpdatesService } from './latest-updates.service';
import { AdvocacyController } from './advocacy.controller';

@Module({
  imports: [PrismaModule],
  controllers: [HomepageController, LatestUpdatesController, AdvocacyController],
  providers: [HomepageService, LatestUpdatesService],
  exports: [HomepageService, LatestUpdatesService],
})
export class HomepageModule {}
