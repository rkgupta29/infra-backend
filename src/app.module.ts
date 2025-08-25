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
import { NewsletterModule } from './newsletter/newsletter.module';
import { TrusteesModule } from './teams/trustees/trustees.module';
import { PatronsModule } from './teams/patrons/patrons.module';
import { TeamModule } from './teams/team/team.module';
import { FellowModule } from './teams/fellow/fellow.module';
import { AdvisorsModule } from './teams/advisors/advisors.module';
import { GalleryModule } from './achives/gallery/gallery.module';
import { VideosModule } from './achives/videos/videos.module';
import { ResearchPapersModule } from './knowledge/research-papers/research-paper.module';
import { KnowledgeConversationModule } from './knowledge/conversation/conversation.module';
import { EngagementsModule } from './outreach-and-engagements/engagements.module';

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
    NewsletterModule,
    AdvisorsModule,
    TeamModule,
    FellowModule,
      ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist'),
    }),
    TrusteesModule,
    EngagementsModule ,
    PatronsModule,
    GalleryModule,
    VideosModule,
    ResearchPapersModule,
    KnowledgeConversationModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}
