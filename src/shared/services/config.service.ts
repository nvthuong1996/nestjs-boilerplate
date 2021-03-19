import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { IAwsConfig } from '../../interfaces/IAwsConfig';
import { SnakeNamingStrategy } from '../../snake-naming.strategy';
import { UserSubscriber } from '../entity-subscribers/user.subscriber';
import { QueueOptions } from 'bull';
import { NODE_ENV } from '../../common/constants/node-env';

declare const module: any;

export class ConfigService {
  constructor() {
    const nodeEnv = this.nodeEnv;
    dotenv.config({
      path: `.${nodeEnv}.env`,
      debug: true,
    });

    // Replace \\n with \n to support multiline strings in AWS
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }

    console.log('process.env', process.env);
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === NODE_ENV.development;
  }

  get getApiEndpoint() {
    return process.env['BACKEND_API_ENDPOINT'];
  }

  get isStaging(): boolean {
    return this.nodeEnv === NODE_ENV.staging;
  }

  get isProduction(): boolean {
    return this.nodeEnv === NODE_ENV.production;
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  public getBullBoardAdminPassword(): string {
    return process.env['BACKEND_BULL_BOARD_ADMIN_PASSWORD'];
  }

  get nodeEnv(): NODE_ENV {
    return (this.get('NODE_ENV') || 'development') as NODE_ENV;
  }

  get queueConfig(): QueueOptions {
    return {
      redis: {
        host: this.get('BACKEND_QUEUE_HOST'),
        port: Number(this.get('BACKEND_QUEUE_PORT')),
      },
    };
  }

  get mailTransporterConfig() {
    return {
      atts: [
        {
          att: 'host',
          value: 'smtp.gmail.com',
        },
        {
          att: 'port',
          value: 465,
        },
        {
          att: 'secure',
          value: true,
        },
        {
          att: 'auth.type',
          value: 'OAuth2',
        },
        {
          att: 'auth.user',
          value: 'hello@techcen.vn',
        },
        {
          att: 'auth.clientId',
          value:
            '540168618875-445f5fj34ooer9ed7dbpker7461qundo.apps.googleusercontent.com',
        },
        {
          att: 'auth.clientSecret',
          value: 'wMijMHqvRonMoNVfCiX0skk_',
        },
        {
          att: 'auth.refreshToken',
          value:
            '1//04ManDI8BFKCDCgYIARAAGAQSNwF-L9Ir74haVG15Adeg9o0YACFGXTYQ37F5mikNUaIaVYaYfaCrknXnidPh_kvSi5C7X-Trk_0',
        },
        {
          att: 'from.name',
          value: '123TRAIN',
        },
        {
          att: 'from.address',
          value: 'hello@techcen.vn',
        },
      ],
    };
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    const entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];
    const migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

    return {
      entities,
      migrations,
      keepConnectionAlive: true,
      type: 'postgres',
      host: this.get('BACKEND_DB_HOST'),
      port: this.getNumber('BACKEND_DB_PORT'),
      username: this.get('BACKEND_DB_USERNAME'),
      password: this.get('BACKEND_DB_PASSWORD'),
      database: this.get('BACKEND_DB_DATABASE'),
      subscribers: [UserSubscriber],
      migrationsRun: this.nodeEnv === NODE_ENV.production,
      // synchronize: this.nodeEnv !== NODE_ENV.production,
      synchronize: true,
      logging:
        this.nodeEnv === NODE_ENV.production ? ['error', 'migration'] : 'all',
      namingStrategy: new SnakeNamingStrategy(),
    };
  }

  get awsS3Config(): IAwsConfig {
    return {
      apiEndpoint: this.get('BACKEND_STORAGE_ENDPOINT'),
      credentials: {
        accessKeyId: this.get('BACKEND_STORAGE_ACCESS_KEY'),
        secretAccessKey: this.get('BACKEND_STORAGE_SECRET_KEY'),
      },
      bucketName: this.get('BACKEND_STORAGE_BUCKET'),
    };
  }
}
