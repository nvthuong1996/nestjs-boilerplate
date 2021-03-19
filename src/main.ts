import 'source-map-support/register';

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as RateLimit from 'express-rate-limit';
import * as compression from 'compression';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';
import { setupSwagger } from './viveo-swagger';
import { CrudConfigService } from '@nestjsx/crud';
import 'reflect-metadata';
import { CrudInterceptor } from './interceptors/crud.interceptor';
import { router as bullBoardRouter } from 'bull-board';
import * as expressBasicAuth from 'express-basic-auth';

import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { AllExceptionsFilter } from './interceptors/all-exceptions-filter';

CrudConfigService.load({
  query: {
    limit: 25,
    cache: 2000,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },

  routes: {
    only: ['createOneBase', 'getManyBase', 'getOneBase', 'updateOneBase'],
    getManyBase: {
      interceptors: [CrudInterceptor],
    },
  },
});

import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const configService = app.select(SharedModule).get(ConfigService);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [
            `'self'`,
            `'unsafe-inline'`,
            'cdn.jsdelivr.net',
            'fonts.googleapis.com',
          ],
          fontSrc: [`'self'`, 'fonts.gstatic.com'],
          imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
        },
      },
    }),
  );
  app.use(
    RateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(compression());

  if (['production'].includes(configService.nodeEnv)) {
    // production
    app.use(
      '/admin/queues',
      expressBasicAuth({
        users: { admin: configService.getBullBoardAdminPassword() },
        challenge: true,
      }),
      bullBoardRouter,
    );
  } else {
    // develop or staging
    app.use(morgan('combined'));
    app.use('/admin/queues', bullBoardRouter);
    setupSwagger(app);
  }

  const port = configService.getNumber('BACKEND_PORT');
  await app.listen(port);

  console.info(`server running on port ${port}`);
}
bootstrap();
