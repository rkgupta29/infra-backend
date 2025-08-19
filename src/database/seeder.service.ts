import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SeederService implements OnModuleInit {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    setTimeout(() => {
      this.seedSuperAdmin();
    }, 1000);
  }

  private async seedSuperAdmin() {
    try {
      // Check if environment variables are available
      const superAdminEmail = this.configService.get<string>('SUPERADMIN_EMAIL');
      const superAdminPassword = this.configService.get<string>('SUPERADMIN_PASSWORD');
      const superAdminName = this.configService.get<string>('SUPERADMIN_NAME');

      if (!superAdminEmail || !superAdminPassword || !superAdminName) {
        this.logger.warn(
          'SuperAdmin environment variables not found. Please set SUPERADMIN_EMAIL, SUPERADMIN_PASSWORD, and SUPERADMIN_NAME in your .env file.',
        );
        this.logger.warn(
          'Using default values for development. CHANGE THESE IN PRODUCTION!',
        );

        // Set default values for development
        process.env.SUPERADMIN_EMAIL = 'superadmin@admin.com';
        process.env.SUPERADMIN_PASSWORD = 'SuperAdmin@123';
        process.env.SUPERADMIN_NAME = 'Super Administrator';
      }

      const superAdmin = await this.authService.createSuperAdmin();
      this.logger.log(
        `SuperAdmin seeded successfully: ${superAdmin.email}`,
      );
    } catch (error) {
      this.logger.error('Failed to seed SuperAdmin:', error.message);
      this.logger.error('Error details:', error.stack);
      
      // Provide helpful guidance
      this.logger.warn('Make sure your database is running and accessible.');
      this.logger.warn('Check your DATABASE_URL in the .env file.');
    }
  }
}
