import { Module } from '@nestjs/common';
import { ResearchPapersModule } from './research-papers/research-paper.module';
import { SectorsModule } from './sectors/sectors.module';
import { KnowledgeConversationModule } from './conversation/conversation.module';
import { BlogsModule } from './blogs/blogs.module';
import { RecentKnowledgeModule } from './recent/recent-knowledge.module';

@Module({
  imports: [
    ResearchPapersModule,
    SectorsModule,
    KnowledgeConversationModule,
    BlogsModule,
    RecentKnowledgeModule,
  ],
  exports: [
    ResearchPapersModule,
    SectorsModule,
    KnowledgeConversationModule,
    BlogsModule,
    RecentKnowledgeModule,
  ],
})
export class KnowledgeModule { }
