// import * as dotenv from 'dotenv';
// dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log(process.env.APP_PORT);
  await app.listen(process.env.APP_PORT);
}
bootstrap();
