import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './service/validation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () =>
    console.log(`Server is working on Port: ${PORT}`),
  );
}

bootstrap();
