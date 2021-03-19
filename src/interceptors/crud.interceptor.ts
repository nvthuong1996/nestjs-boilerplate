import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PARSED_CRUD_REQUEST_KEY } from '@nestjsx/crud/lib/constants';
import { CrudBaseInterceptor } from '@nestjsx/crud/lib/interceptors/crud-base.interceptor';

@Injectable()
export class CrudInterceptor
  extends CrudBaseInterceptor
  implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { crudOptions } = this.getCrudInfo(context);
    const request = context.switchToHttp().getRequest();
    const req: any = request[PARSED_CRUD_REQUEST_KEY];
    const user = request.user;

    if (req) {
      Object.assign(req.options, {
        user,
        crudOptions,
      });
    }
    return next.handle();
  }
}
