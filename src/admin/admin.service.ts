import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { DeleteConfirmationDto } from './dto/delete-confirmation.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async create(createAdminDto: CreateAdminDto, currentUser: any) {
    // Only superadmin can create admins
    if (currentUser.role !== UserRole.SUPERADMIN) {
      throw new ForbiddenException('Only superadmin can create new admins');
    }

    // Check if email already exists
    const existingAdmin = await this.prisma.admin.findUnique({
      where: { email: createAdminDto.email },
    });

    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists');
    }

    const hashedPassword = await this.authService.hashPassword(
      createAdminDto.password,
    );

    const admin = await this.prisma.admin.create({
      data: {
        name: createAdminDto.name,
        email: createAdminDto.email,
        password: hashedPassword,
        role: UserRole.ADMIN,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return admin;
  }

  async findAll(currentUser: any) {
    // Only superadmin can view all admins
    if (currentUser.role !== UserRole.SUPERADMIN) {
      throw new ForbiddenException('Only superadmin can view all admins');
    }

    // Return only admins, not superadmin
    const admins = await this.prisma.admin.findMany({
      where: {
        role: UserRole.ADMIN,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return admins;
  }

  async findOne(id: string, currentUser: any) {
    // Users can view their own profile, superadmin can view any profile
    if (currentUser.role !== UserRole.SUPERADMIN && currentUser.id !== id) {
      throw new ForbiddenException(
        'You can only view your own profile unless you are superadmin',
      );
    }

    const admin = await this.prisma.admin.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }



  async remove(
    id: string,
    deleteConfirmationDto: DeleteConfirmationDto,
    currentUser: any,
  ) {
    // Only superadmin can delete admins
    if (currentUser.role !== UserRole.SUPERADMIN) {
      throw new ForbiddenException('Only superadmin can delete admins');
    }

    const admin = await this.prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    // Prevent deletion of superadmin
    if (admin.role === UserRole.SUPERADMIN) {
      throw new ForbiddenException('Cannot delete superadmin account');
    }

    // Prevent self-deletion
    if (admin.id === currentUser.id) {
      throw new ForbiddenException('Cannot delete your own account');
    }

    // Verify superadmin password for security
    const superAdmin = await this.prisma.admin.findUnique({
      where: { id: currentUser.id },
    });

    if (!superAdmin) {
      throw new NotFoundException('SuperAdmin not found');
    }

    // Import bcrypt and verify password
    const bcrypt = require('bcryptjs');
    const isPasswordValid = await bcrypt.compare(
      deleteConfirmationDto.superAdminPassword,
      superAdmin.password
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid superadmin password');
    }

    await this.prisma.admin.delete({
      where: { id },
    });

    return {
      message: 'Admin deleted successfully',
      deletedAdmin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    };
  }

  async getProfile(currentUser: any) {
    return this.findOne(currentUser.id, currentUser);
  }

  /**
   * Find admin by ID without authorization checks
   * @param id - The ID of the admin to find
   * @returns The admin record without password
   */
  async findOneById(id: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }
}
