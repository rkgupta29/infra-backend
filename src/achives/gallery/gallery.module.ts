import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { FileUploadModule } from '../../common/file-upload/file-upload.module';
import { GalleryFormDataMiddleware } from './middleware/gallery-form-data.middleware';

@Module({
  imports: [PrismaModule, FileUploadModule],
  controllers: [GalleryController],
  providers: [GalleryService, GalleryFormDataMiddleware],
  exports: [GalleryService],
})
export class GalleryModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GalleryFormDataMiddleware)
      .forRoutes({ path: 'archives/gallery', method: RequestMethod.POST });
  }
}