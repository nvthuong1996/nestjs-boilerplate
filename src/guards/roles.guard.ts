import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PARSED_CRUD_REQUEST_KEY } from '@nestjsx/crud/lib/constants';
import { CrudOptions } from '../decorators/crud.decorator';
import { getAction } from '@nestjsx/crud';
import { RoleType } from '../common/constants/role-type';
import { get, isArray } from '../utils/lodash';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const req: any = request[PARSED_CRUD_REQUEST_KEY];
    const roles: string[] = get(request, 'user.roles', []);

    const routerRoles =
      this._reflector.get<string[]>('roles', context.getHandler()) || [];

    if (routerRoles.length) {
      for (const role of roles) {
        if (routerRoles.includes(role)) {
          return true;
        }
      }
      // throw new UnauthorizedException();
    }

    roles.push(RoleType.ANY);

    const handler = context.getHandler();

    const controller = context.getClass();

    const action = getAction(handler);

    const crudOptions: CrudOptions = Reflect.getMetadata(
      'CRUD_OPTIONS',
      controller,
    );

    if (!crudOptions) {
      return true;
    }

    // restrict access
    if (crudOptions.roles) {
      if (isArray(crudOptions.roles)) {
        for (const role of crudOptions.roles) {
          if (roles.includes(role)) {
            return true;
          }
        }
      } else {
        // object
        for (const role of roles) {
          if (
            crudOptions.roles[role] === action ||
            crudOptions.roles[role]?.includes(action)
          ) {
            return true;
          }
        }
      }
    }

    throw new UnauthorizedException();
  }
}
