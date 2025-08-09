import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  getUsers(): Promise<User[]> {
    return this.appService.getUsers();
  }

  @Post('users')
  createUser(
    @Body()
    body: { email: string; name?: string; birthYear?: number },
  ): Promise<User> {
    return this.appService.createUser(body);
  }
}
