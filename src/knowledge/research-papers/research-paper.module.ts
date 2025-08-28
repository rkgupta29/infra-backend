import { Module } from '@nestjs/common';
import { ResearchPapersService } from './research-papers.service';
import { ResearchPapersController } from './research-paper.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { SectorsModule } from '../sectors/sectors.module';

@Module({
  imports: [PrismaModule, SectorsModule],
  controllers: [ResearchPapersController],
  providers: [ResearchPapersService],
  exports: [ResearchPapersService],
})
export class ResearchPapersModule {}