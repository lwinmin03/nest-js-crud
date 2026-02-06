import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/response.interceptot';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe())
  
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();
