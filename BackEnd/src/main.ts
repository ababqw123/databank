import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users/users.module';


async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
