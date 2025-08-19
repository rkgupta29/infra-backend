import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { SeederService } from './database/seeder.service';
import { SocialProfilesModule } from './social-profiles/social-profiles.module';
import { OrganisationModule } from './organisation/organisation.module';
import { HomepageModule } from './homepage/homepage.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { NewsletterSubscriptionModule } from './newsletter_subscription/newsletter_subscription.module';
import { AssociationsModule } from './associations/associations.module';
import { MediaCoverageModule } from './media-coverage/media-coverage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,      
    }),
    PrismaModule,
    AuthModule,
    AdminModule,
    SocialProfilesModule,
    OrganisationModule,
    HomepageModule,
    NewsletterSubscriptionModule,
    AssociationsModule,
    MediaCoverageModule,
      ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}
