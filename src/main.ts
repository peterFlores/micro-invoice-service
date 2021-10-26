/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.setGlobalPrefix("api/v1")
  app.enableCors({
    origin: '*'
  });
  await app.listen(3006);
}
bootstrap();
