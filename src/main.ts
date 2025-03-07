import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3001
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST'],
  });
  await app.listen(PORT);
  console.log(`🚀 WebSocket server is running on ws://localhost:${PORT}`);
}

bootstrap();