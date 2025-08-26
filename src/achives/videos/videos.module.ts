import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [PrismaModule, CategoriesModule],
  controllers: [VideosController],
  providers: [VideosService],
  exports: [VideosService],
})
export class VideosModule {}