import { Module } from '@nestjs/common';
import { ResearchPapersService } from './research-papers.service';
import { ResearchPapersController } from './research-paper.controller';


@Module({
  imports: [],
  controllers: [ResearchPapersController],
  providers: [ResearchPapersService],
})
export class ResearchPapersModule {}
