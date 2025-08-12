import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable CORS if needed
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Infra backend admin panel')
    .setDescription('Infra backend admin panel with all the modules')
    .setVersion('1.0')
    .addTag('Authentication', 'Admin authentication endpoints')
    .addTag('Admin Management', 'CRUD operations for admin users')
    .addTag('Social Profiles', 'CRUD for social media profiles')
    .addTag('Organisation', 'Organisation details (public read, admin write)')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Admin Panel Backend running on port ${port}`);
  console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📖 Swagger documentation available at http://localhost:${port}/docs`);
}
bootstrap();