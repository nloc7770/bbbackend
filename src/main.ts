import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './type/common';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const databaseEnv = configService.get<DatabaseConfig>('database');
  app.use(helmet());
  app.use((req: Request, res: Response, next) => {
    logger.debug('===TRIGGER GLOBAL MIDDLEWARE===');
    next();
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
