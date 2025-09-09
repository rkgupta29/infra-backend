import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ResearchPapersService } from '../research-papers/research-papers.service';
import { ConversationService } from '../conversation/conversation.service';
import { BlogsService } from '../blogs/blogs.service';

// Note: This is a temporary workaround until the Prisma client is regenerated
interface ExtendedPrismaService extends PrismaService {
    researchPaper: any;
    conversation: any;
    blog: any;
}

@Injectable()
export class RecentKnowledgeService {
    private readonly logger = new Logger(RecentKnowledgeService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly researchPapersService: ResearchPapersService,
        private readonly conversationService: ConversationService,
        private readonly blogsService: BlogsService,
    ) { }

    /**
     * Get the most recent research paper, conversation, and blog
     * @returns Object containing the most recent items
     */
    async getRecentKnowledge() {
        try {
            // Get most recent research paper
            const recentResearchPaper = await this.getRecentResearchPaper();

            // Get most recent conversation
            const recentConversation = await this.getRecentConversation();

            // Get most recent blog
            const recentBlog = await this.getRecentBlog();

            return {
                researchPaper: recentResearchPaper,
                conversation: recentConversation,
                blog: recentBlog,
                lastUpdated: new Date().toISOString()
            };
        } catch (error) {
            this.logger.error(`Failed to get recent knowledge: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get the most recent research paper
     * @returns Most recent research paper
     */
    private async getRecentResearchPaper() {
        try {
            // Try to get from database
            const researchPaper = await (this.prisma as ExtendedPrismaService).researchPaper.findFirst({
                where: { active: true },
                orderBy: { date: 'desc' },
                include: { sectors: true },
            });

            if (researchPaper) {
                return researchPaper;
            }

            // Fallback to service method if database query fails
            const result = await this.researchPapersService.findAll(true, undefined, 1, 1);
            return result.researchPapers?.[0] || null;
        } catch (error) {
            this.logger.warn(`Failed to get recent research paper: ${error.message}`);
            // Fallback to static data if needed
            return null;
        }
    }

    /**
     * Get the most recent conversation
     * @returns Most recent conversation
     */
    private async getRecentConversation() {
        try {
            // Try to get from database
            const conversation = await (this.prisma as ExtendedPrismaService).conversation.findFirst({
                where: { active: true },
                orderBy: { createdAt: 'desc' },
            });

            if (conversation) {
                return conversation;
            }

            // Fallback to service method if database query fails
            const result = await this.conversationService.findAll(1, 1, true);
            return result.data?.[0] || null;
        } catch (error) {
            this.logger.warn(`Failed to get recent conversation: ${error.message}`);
            // Fallback to static data if needed
            return null;
        }
    }

    /**
     * Get the most recent blog
     * @returns Most recent blog
     */
    private async getRecentBlog() {
        try {
            // Try to get from database
            const blog = await (this.prisma as ExtendedPrismaService).blog.findFirst({
                where: { active: true },
                orderBy: { publishedDate: 'desc' },
                include: { sectors: true },
            });

            if (blog) {
                return blog;
            }

            // Fallback to service method if database query fails
            const result = await this.blogsService.findAll(true, 1, 1);
            return result.blogs?.[0] || null;
        } catch (error) {
            this.logger.warn(`Failed to get recent blog: ${error.message}`);
            // Fallback to static data if needed
            return null;
        }
    }
}
