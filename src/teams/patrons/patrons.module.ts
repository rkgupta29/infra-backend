import { Module } from '@nestjs/common';
import { PatronsController } from './patrons.controller';
import { PatronsService } from './patrons.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [PatronsController],
  providers: [PatronsService, PrismaService],
  exports: [PatronsService],
})
export class PatronsModule { }
