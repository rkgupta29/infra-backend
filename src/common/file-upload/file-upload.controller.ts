import { 
  Controller, 
  Post, 
  UseInterceptors, 
  UploadedFile,
  BadRequestException,
  UseGuards,
  Body,
  Delete,
  Param,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import { 
  ApiTags, 
  ApiConsumes, 
  ApiOperation, 
  ApiBody, 
  ApiBearerAuth,
  ApiResponse,
  ApiParam
} from '@nestjs/swagger';
import { FileUploadService } from './file-upload.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('File Upload')
@Controller('uploads')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('pdf')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Upload a PDF file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'PDF file to upload',
        },
        filename: {
          type: 'string',
          description: 'Optional custom filename (without extension)',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'PDF uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          example: '/assets/pdf/newsletter-june-2023.pdf',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadPdf(
    @UploadedFile() file: Multer.File,
    @Body('filename') filename?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    
    const url = await this.fileUploadService.uploadPdf(file, filename);
    return { url };
  }

  @Post('image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Upload an image file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file to upload (JPEG, PNG, GIF, WebP)',
        },
        filename: {
          type: 'string',
          description: 'Optional custom filename (without extension)',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Image uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          example: '/assets/images/newsletter-cover-june-2023.jpg',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Multer.File,
    @Body('filename') filename?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    
    const url = await this.fileUploadService.uploadImage(file, filename);
    return { url };
  }

  @Delete(':type/:filename')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete a file' })
  @ApiParam({
    name: 'type',
    enum: ['pdf', 'images'],
    description: 'File type (pdf or images)',
  })
  @ApiParam({
    name: 'filename',
    description: 'Filename to delete',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'File deleted successfully',
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: true,
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  async deleteFile(
    @Param('type') type: string,
    @Param('filename') filename: string,
  ) {
    if (!['pdf', 'images'].includes(type)) {
      throw new BadRequestException('Invalid file type. Must be "pdf" or "images"');
    }
    
    const filePath = `${type}/${filename}`;
    const success = await this.fileUploadService.deleteFile(filePath);
    return { success };
  }
}
