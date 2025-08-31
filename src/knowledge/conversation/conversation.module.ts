import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { FileUploadModule } from '../../common/file-upload/file-upload.module';

@Module({
  imports: [PrismaModule, FileUploadModule],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class KnowledgeConversationModule {}