import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeDataSource } from './database/data-source';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './config/swagger.config';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { AllExceptionsFilter } from './filters/all-exception.filter';

async function bootstrap() {
  await initializeDataSource();
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('api/');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app);
  }

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  await app.listen(port, '0.0.0.0');
}
bootstrap();
