import { Module } from '@nestjs/common';
import { AdvisorsController } from './advisors.controller';
import { AdvisorsService } from './advistors.service';
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
  controllers: [AdvisorsController],
  providers: [AdvisorsService, PrismaService],
  exports: [AdvisorsService],
})
export class AdvisorsModule { }