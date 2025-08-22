import { Module } from '@nestjs/common';
import { PatronsController } from './patrons.controller';
import { PatronsService } from './patrons.service';

@Module({
  controllers: [PatronsController],
  providers: [PatronsService],
  exports: [PatronsService],
})
export class PatronsModule {}
