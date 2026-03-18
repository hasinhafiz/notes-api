import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  // express-session
  app.use(
    session({
      secret: 'mySecretKey',
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
