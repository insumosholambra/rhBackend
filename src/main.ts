import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';


async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { cors: false });
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
  });
  await app.listen(3000, '192.168.1.198'); // Escutando no IP específico
}
bootstrap();
