import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import type { Multer } from 'multer';

@Injectable()
export class FileUploadService {
  private readonly logger = new Logger(FileUploadService.name);
  private readonly UPLOAD_DIR = 'assets';
  private readonly ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  private readonly ALLOWED_PDF_TYPE = 'application/pdf';
  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  constructor() {
    // Ensure upload directories exist on service initialization
    this.ensureDirectoriesExist();
  }

  /**
   * Ensure all required directories exist
   */
  private async ensureDirectoriesExist(): Promise<void> {
    try {
      await this.ensureDir(this.UPLOAD_DIR);
      await this.ensureDir(path.join(this.UPLOAD_DIR, 'pdf'));
      await this.ensureDir(path.join(this.UPLOAD_DIR, 'images'));
      this.logger.log('Upload directories created/verified successfully');
    } catch (error) {
      this.logger.error('Failed to create upload directories', error);
    }
  }

  /**
   * Create directory if it doesn't exist
   */
  private async ensureDir(dirPath: string): Promise<void> {
    try {
      await fs.access(dirPath);
    } catch (error) {
      await fs.mkdir(dirPath, { recursive: true });
      this.logger.log(`Created directory: ${dirPath}`);
    }
  }

  /**
   * Upload a PDF file
   * @param file The file to upload (Multer.File)
   * @param customFilename Optional custom filename (without extension)
   * @returns The URL path to the uploaded file
   */
  async uploadPdf(file: Multer.File, customFilename?: string): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file
    if (file.mimetype !== this.ALLOWED_PDF_TYPE) {
      throw new BadRequestException('Invalid file type. Only PDF files are allowed.');
    }

    if (file.size > this.MAX_FILE_SIZE) {
      throw new BadRequestException(`File size exceeds the limit of ${this.MAX_FILE_SIZE / (1024 * 1024)}MB`);
    }

    // Generate filename with UUID to prevent conflicts
    const filename = customFilename 
      ? `${customFilename.replace(/[^a-zA-Z0-9-_]/g, '')}.pdf`
      : `${uuidv4()}.pdf`;
    
    const relativePath = path.join('pdf', filename);
    const fullPath = path.join(this.UPLOAD_DIR, relativePath);

    try {
      await fs.writeFile(fullPath, file.buffer);
      this.logger.log(`PDF file uploaded successfully: ${fullPath}`);
      
      // Return the URL path that can be stored in the database
      return `/assets/${relativePath}`;
    } catch (error) {
      this.logger.error(`Failed to upload PDF file: ${error.message}`);
      throw new BadRequestException('Failed to upload PDF file');
    }
  }

  /**
   * Upload an image file
   * @param file The file to upload (Multer.File)
   * @param customFilename Optional custom filename (without extension)
   * @returns The URL path to the uploaded image
   */
  async uploadImage(file: Multer.File, customFilename?: string): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file
    if (!this.ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.');
    }

    if (file.size > this.MAX_FILE_SIZE) {
      throw new BadRequestException(`File size exceeds the limit of ${this.MAX_FILE_SIZE / (1024 * 1024)}MB`);
    }

    // Get file extension from mimetype
    const extension = this.getExtensionFromMimeType(file.mimetype);
    
    // Generate filename with UUID to prevent conflicts
    const filename = customFilename 
      ? `${customFilename.replace(/[^a-zA-Z0-9-_]/g, '')}.${extension}`
      : `${uuidv4()}.${extension}`;
    
    const relativePath = path.join('images', filename);
    const fullPath = path.join(this.UPLOAD_DIR, relativePath);

    try {
      await fs.writeFile(fullPath, file.buffer);
      this.logger.log(`Image file uploaded successfully: ${fullPath}`);
      
      // Return the URL path that can be stored in the database
      return `/assets/${relativePath}`;
    } catch (error) {
      this.logger.error(`Failed to upload image file: ${error.message}`);
      throw new BadRequestException('Failed to upload image file');
    }
  }

  /**
   * Delete a file from the filesystem
   * @param filePath The path to the file to delete (relative to the assets directory)
   * @returns Boolean indicating success
   */
  async deleteFile(filePath: string): Promise<boolean> {
    try {
      // Remove the leading slash and 'assets/' if present
      const normalizedPath = filePath.replace(/^\/assets\//, '');
      const fullPath = path.join(this.UPLOAD_DIR, normalizedPath);
      
      await fs.access(fullPath);
      await fs.unlink(fullPath);
      this.logger.log(`File deleted successfully: ${fullPath}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to delete file: ${error.message}`);
      return false;
    }
  }

  /**
   * Get file extension from MIME type
   */
  private getExtensionFromMimeType(mimeType: string): string {
    const mimeToExt = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
    };
    return mimeToExt[mimeType] || 'jpg';
  }
}
