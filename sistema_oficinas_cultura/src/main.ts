import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule.register({
      driver: 'in-memory', //Ou 'in-file'
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: false, // Retorna 404 se o payload não atender as regras do DTO
      whitelist: true, // Remove campos que não estão no DTO
      transform: true, // Transforma os campos para o tipo especificado no DTO
    }),
  );
  await app.listen(3000);
}
bootstrap();
