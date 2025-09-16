import { Module } from '@nestjs/common';
import { MediaCoverageController } from './media-coverage.controller';
import { MediaCoverageService } from './media-coverage.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MediaCoverageController],
  providers: [MediaCoverageService],
  exports: [MediaCoverageService],
})
export class MediaCoverageModule { }