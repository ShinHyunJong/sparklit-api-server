import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

(BigInt.prototype as any).toJSON = function () {
  return Number(this.toString());
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3005;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableShutdownHooks();
  app.enableCors();
  await app.listen(port);
}
bootstrap();
