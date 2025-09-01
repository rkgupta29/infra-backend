import { Module } from '@nestjs/common';
import { ResearchPapersModule } from './research-papers/research-paper.module';
import { SectorsModule } from './sectors/sectors.module';
import { KnowledgeConversationModule } from './conversation/conversation.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [
    ResearchPapersModule,
    SectorsModule,
    KnowledgeConversationModule,
    BlogsModule,
  ],
  exports: [
    ResearchPapersModule,
    SectorsModule,
    KnowledgeConversationModule,
    BlogsModule,
  ],
})
export class KnowledgeModule {}
