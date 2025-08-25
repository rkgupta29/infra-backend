import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { EngagementsController } from './engagements.controller';
import { EngagementsService } from './engagements.service';

@Module({
  imports: [PrismaModule],
  controllers: [EngagementsController],
  providers: [EngagementsService],
  exports: [EngagementsService],
})
export class EngagementsModule {}
