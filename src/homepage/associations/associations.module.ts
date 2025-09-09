import { Module } from '@nestjs/common';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { FileUploadModule } from '../../common/file-upload/file-upload.module';

@Module({
    imports: [PrismaModule, FileUploadModule],
    controllers: [AssociationsController],
    providers: [AssociationsService],
    exports: [AssociationsService],
})
export class AssociationsModule { }
