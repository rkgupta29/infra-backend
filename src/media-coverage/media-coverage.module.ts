import { Module } from '@nestjs/common';
import { MediaCoverageController } from './media-coverage.controller';
import { MediaCoverageService } from './media-coverage.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FileUploadModule } from '../common/file-upload/file-upload.module';

@Module({
  imports: [PrismaModule, FileUploadModule],
  controllers: [MediaCoverageController],
  providers: [MediaCoverageService],
  exports: [MediaCoverageService],
})
export class MediaCoverageModule { }