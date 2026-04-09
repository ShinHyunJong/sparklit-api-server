import 'dotenv/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

(BigInt.prototype as any).toJSON = function () {
  return Number(this.toString());
};

function validateRequiredEnvVars() {
  const required = [
    'DATABASE_URL',
    'HASH_KEY',
    'PAYMONGO_SECRET_KEY',
    'PAYMONGO_WEBHOOK_SECRET',
    'AWS_S3_ACCESS_KEY_ID',
    'AWS_S3_SECRET_ACCESS_KEY',
    'AWS_S3_REGION',
    'AWS_S3_BUCKET',
  ];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length === 0) return;

  const logger = new Logger('Bootstrap');
  if (process.env.NODE_ENV === 'production') {
    logger.error(
      `Missing required environment variables: ${missing.join(', ')}`,
    );
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`,
    );
  }
  logger.warn(
    `Missing environment variables (ignored in non-production): ${missing.join(', ')}`,
  );
}

async function bootstrap() {
  validateRequiredEnvVars();

  const app = await NestFactory.create(AppModule, { rawBody: true });
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
