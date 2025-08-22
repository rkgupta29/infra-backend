import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';


@Module({
  imports: [],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class KnowledgeConversationModule {}
