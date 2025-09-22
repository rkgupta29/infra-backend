import { Module } from '@nestjs/common';
import { TrusteesController } from './trustees.controller';
import { TrusteesService } from './trustees.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TrusteesController],
  providers: [TrusteesService],
  exports: [TrusteesService],
})
export class TrusteesModule { }
