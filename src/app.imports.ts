import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { Request } from 'express';
import { LoggerModule } from 'nestjs-pino';
import { TypegooseModule } from 'nestjs-typegoose';
import { TypegooseConfig } from './config/typegoose.config';

export const AppImports = [
  ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'test', 'staging', 'production')
        .default('development'),
      APP_PORT: Joi.number().default(3000),
      LOGGER_LEVEL: Joi.string()
        .valid('error', 'warn', 'info', 'debug', 'log', 'silent')
        .default('debug'),
      MONGO_URL: Joi.required(),
      JWT_SECRET: Joi.string().required(),

      /** EMAILS */
      EMAIL_PROVIDER: Joi.string().required().valid('sendgrid', 'mailtrap'),
      SENDGRID_API_KEY: Joi.string().required(),
      SENDGRID_TIMEOUT: Joi.number().required(),
      MAILTRAP_HOST: Joi.string().required(),
      MAILTRAP_PORT: Joi.number().required(),
      MAILTRAP_USER: Joi.string().required(),
      MAILTRAP_PASS: Joi.string().required(),
    }),
  }),
  LoggerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      return {
        pinoHttp: {
          reqCustomProps: (req: Request) => ({
            body: req.body,
          }),
          redact: {
            paths: [],
            censor: '********',
          },
          name: process.env.npm_package_name,
          level: config.get('LOGGER_LEVEL'),
          prettyPrint: false,
        },
      };
    },
  }),

  TypegooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => TypegooseConfig(config),
  }),
];
