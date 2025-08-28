import { Module } from '@nestjs/common';
import { ResearchPapersModule } from './research-papers/research-paper.module';
import { SectorsModule } from './sectors/sectors.module';
import { KnowledgeConversationModule } from './conversation/conversation.module';

@Module({
  imports: [
    ResearchPapersModule,
    SectorsModule,
    KnowledgeConversationModule,
  ],
  exports: [
    ResearchPapersModule,
    SectorsModule,
    KnowledgeConversationModule,
  ],
})
export class KnowledgeModule {}
