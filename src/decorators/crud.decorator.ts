import { ModelOptions } from '@nestjsx/crud/lib/interfaces/model-options.interface';
import { DtoOptions } from '@nestjsx/crud/lib/interfaces/dto-options.interface';
import { SerializeOptions } from '@nestjsx/crud/lib/interfaces/serialize-options.interface';
import { QueryOptions } from '@nestjsx/crud/lib/interfaces/query-options.interface';
import { ParamsOptions } from '@nestjsx/crud/lib/interfaces/params-options.interface';
import { SetMetadata, ValidationPipeOptions } from '@nestjs/common';
import { AbstractEntity } from '../common/abstract.entity';
import { CrudRoutesFactory } from '../common/crud-router.factory';
import { BaseRouteName } from '@nestjsx/crud/lib/types';
import { RoleType } from '../common/constants/role-type';
import { CrudActions } from '@nestjsx/crud';

export interface RoutesOptions {
  exclude?: BaseRouteName[];
  only?: BaseRouteName[];
  getManyBase?: GetMayRouteOptions;
  getOneBase?: GetOneRouteOptions;
  createOneBase?: CreateOneRouteOptions;
  createManyBase?: CreateManyRouteOptions;
  updateOneBase?: UpdateOneRouteOptions;
  replaceOneBase?: ReplaceOneRouteOptions;
  deleteOneBase?: DeleteOneRouteOptions;
}
export interface BaseRouteOptions {
  interceptors?: any[];
  decorators?: (PropertyDecorator | MethodDecorator)[];
  afterHooks?: string[];
  beforeHooks?: string[];
}
export type GetMayRouteOptions = BaseRouteOptions;
export type GetOneRouteOptions = BaseRouteOptions;
export interface CreateOneRouteOptions extends BaseRouteOptions {
  returnShallow?: boolean;
}
export type CreateManyRouteOptions = BaseRouteOptions;
export interface ReplaceOneRouteOptions extends BaseRouteOptions {
  allowParamsOverride?: boolean;
  returnShallow?: boolean;
}
export interface UpdateOneRouteOptions extends BaseRouteOptions {
  allowParamsOverride?: boolean;
  returnShallow?: boolean;
}
export interface DeleteOneRouteOptions extends BaseRouteOptions {
  returnDeleted?: boolean;
}

export interface CrudOptions {
  model: ModelOptions;
  dto?: DtoOptions;
  serialize?: SerializeOptions;
  query?: QueryOptions;
  routes?: RoutesOptions;
  params?: ParamsOptions;
  validation?: ValidationPipeOptions | false;
  relationModelPermission?: {
    [key: string]: {
      entity: AbstractEntity;
    };
  };
  roles?:
    | string[]
    | {
        [x: string]: CrudActions | CrudActions[];
      };
  customJoin?: any;
}

export const CRUD_OPTIONS_INJECTION = Symbol.for('INJECTION');

// eslint-disable-next-line @typescript-eslint/ban-types
export const AppCrud = (options: CrudOptions) => (target: Object) => {
  let factory = CrudRoutesFactory.create(target, options);
  Reflect.defineMetadata('CRUD_OPTIONS', options, target);
  factory = undefined;
};
