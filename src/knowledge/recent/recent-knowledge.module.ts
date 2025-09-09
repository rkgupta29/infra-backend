import { Module } from '@nestjs/common';
import { RecentKnowledgeController } from './recent-knowledge.controller';
import { RecentKnowledgeService } from './recent-knowledge.service';
import { ResearchPapersModule } from '../research-papers/research-paper.module';
import { KnowledgeConversationModule } from '../conversation/conversation.module';
import { BlogsModule } from '../blogs/blogs.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [
        PrismaModule,
        ResearchPapersModule,
        KnowledgeConversationModule,
        BlogsModule,
    ],
    controllers: [RecentKnowledgeController],
    providers: [RecentKnowledgeService],
})
export class RecentKnowledgeModule { }
