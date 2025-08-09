import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async createUser(userData: { email: string; name?: string; birthYear?: number }) {
    return this.prisma.user.create({ data: userData });
  }
  
}
