import { Module } from '@nestjs/common';
import { TrusteesController } from './trustees.controller';
import { TrusteesService } from './trustees.service';
import { PrismaService } from '../../prisma/prisma.service';
import { FileUploadModule } from '../../common/file-upload/file-upload.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    FileUploadModule,
    MulterModule.register({
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    }),
  ],
  controllers: [TrusteesController],
  providers: [TrusteesService, PrismaService],
  exports: [TrusteesService],
})
export class TrusteesModule { }
