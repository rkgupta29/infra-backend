import { Module } from '@nestjs/common';
import { MediaCoverageController } from './media-coverage.controller';
import { MediaCoverageService } from './media-coverage.service';

@Module({
  controllers: [MediaCoverageController],
  providers: [MediaCoverageService],
  exports: [MediaCoverageService],
})
export class MediaCoverageModule {}
