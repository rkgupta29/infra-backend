import { Module } from '@nestjs/common';
import { FellowController } from './fellow.controller';
import { FellowService } from './fellow.service';
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
  controllers: [FellowController],
  providers: [FellowService, PrismaService],
  exports: [FellowService],
})
export class FellowModule { }