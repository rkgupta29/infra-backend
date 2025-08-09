import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const admin = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: admin.id,
      email: admin.email,
      role: admin.role,
      name: admin.name,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    };
  }

  async createSuperAdmin() {
    const superAdminEmail = this.configService.get<string>('SUPERADMIN_EMAIL') || 'superadmin@admin.com';
    const superAdminPassword = this.configService.get<string>('SUPERADMIN_PASSWORD') || 'SuperAdmin@123';
    const superAdminName = this.configService.get<string>('SUPERADMIN_NAME') || 'Super Administrator';

    if (!superAdminEmail || !superAdminPassword || !superAdminName) {
      throw new BadRequestException(
        'SuperAdmin credentials not found in environment variables',
      );
    }

    try {
      const existingSuperAdmin = await this.prisma.admin.findUnique({
        where: { email: superAdminEmail },
      });

      if (existingSuperAdmin) {
        return existingSuperAdmin;
      }

      const hashedPassword = await bcrypt.hash(superAdminPassword, 12);

      const superAdmin = await this.prisma.admin.create({
        data: {
          email: superAdminEmail,
          password: hashedPassword,
          name: superAdminName,
          role: UserRole.SUPERADMIN,
        },
      });

      return superAdmin;
    } catch (error) {
      throw new BadRequestException(
        `Failed to create SuperAdmin: ${error.message}`,
      );
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
}
