import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SocialProfilesService } from './social-profiles.service';
import { SocialProfilesController } from './social-profiles.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SocialProfilesController],
  providers: [SocialProfilesService],
})
export class SocialProfilesModule {}


