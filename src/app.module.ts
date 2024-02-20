import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './database/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        PORT: Joi.number().default(3000),
      }),
      validationOptions: {
        abortEarly: false,
      },
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.dev.env' : '.env',
      load: [databaseConfig],
      cache: true,
      expandVariables: true,
    }),
  ],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
