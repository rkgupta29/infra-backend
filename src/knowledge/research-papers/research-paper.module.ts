import { Module } from '@nestjs/common';
import { ResearchPapersService } from './research-papers.service';
import { ResearchPapersController } from './research-paper.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { SectorsModule } from '../sectors/sectors.module';
import { FileUploadModule } from '../../common/file-upload/file-upload.module';

@Module({
  imports: [PrismaModule, SectorsModule, FileUploadModule],
  controllers: [ResearchPapersController],
  providers: [ResearchPapersService],
  exports: [ResearchPapersService],
})
export class ResearchPapersModule {}