import { Module } from '@nestjs/common';
import { FellowController } from './fellow.controller';
import { FellowService } from './fellow.service';

@Module({
  controllers: [FellowController],
  providers: [FellowService],
  exports: [FellowService],
})
export class FellowModule {}
