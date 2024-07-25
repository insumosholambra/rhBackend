import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import  helmet  from 'helmet'


async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { cors: false });

  app.use(helmet()); 

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
  });

  const config = new DocumentBuilder()
    .setTitle('Título da API')
    .setDescription('Descrição da API')
    .setVersion('1.0')
    .addTag('tag')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, '192.168.1.75'); 
}

bootstrap();

