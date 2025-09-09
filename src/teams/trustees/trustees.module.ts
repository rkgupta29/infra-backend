import { Module } from '@nestjs/common';
import { TrusteesController } from './trustees.controller';
import { TrusteesService } from './trustees.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [TrusteesController],
  providers: [TrusteesService, PrismaService],
  exports: [TrusteesService],
})
export class TrusteesModule { }
