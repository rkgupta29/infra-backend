import { Module } from '@nestjs/common';
import { TrusteesController } from './trustees.controller';
import { TrusteesService } from './trustees.service';

@Module({
  controllers: [TrusteesController],
  providers: [TrusteesService],
  exports: [TrusteesService],
})
export class TrusteesModule {}
