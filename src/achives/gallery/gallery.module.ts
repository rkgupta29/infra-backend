import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { FileUploadModule } from '../../common/file-upload/file-upload.module';

@Module({
  imports: [PrismaModule, FileUploadModule],
  controllers: [GalleryController],
  providers: [GalleryService],
  exports: [GalleryService],
})
export class GalleryModule { }