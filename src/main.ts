import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/response.interceptot';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { RoleGuard } from './features/auth/guards/role.guard';
import   cookieParser  from'cookie-parser'
async function bootstrap() {

  
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe())

  // app.useGlobalGuards(new RoleGuard(new Reflector()));
app.use(cookieParser('secret')); // (Fixed typo: 'secrect' -> 'secret')
  
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();
