import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  /*
   *  Swagger Configuration
   */

  const config = new DocumentBuilder()
    .setTitle('NestJS Blog App Api')
    .setDescription('Use the base Api as http://localhost:3000/api')
    .setVersion('1.0')
    .setTermsOfService('http://localhost:3000/api')
    .setLicense('MIT', 'http://localhost:3000/api')
    .addServer('http://localhost:3000')
    .addTag('nestjs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
