import { Module } from '@nestjs/common';
import { PatronsController } from './patrons.controller';
import { PatronsService } from './patrons.service';
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
  controllers: [PatronsController],
  providers: [PatronsService, PrismaService],
  exports: [PatronsService],
})
export class PatronsModule { }
