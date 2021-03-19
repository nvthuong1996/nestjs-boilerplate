import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudActions, CrudAuth, CrudController, Override } from '@nestjsx/crud';

import { UseAppGuard } from '../../../decorators/app-guard';
import { UserEntity } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { AppCrud } from '../../../decorators/crud.decorator';
import { RoleType } from '../../../common/constants/role-type';
import { AuthUser } from '../../../decorators/auth-user.decorator';

@AppCrud({
  model: {
    type: UserEntity,
  },
  routes: {
    only: ['getOneBase', 'updateOneBase'],
    updateOneBase: {
      returnShallow: true,
    },
    getOneBase: {
      interceptors: [],
      afterHooks: [],
      beforeHooks: [],
    },
  },
  params: {
    id: {
      primary: true,
      disabled: true,
    },
  },
  dto: {
    update: UpdateProfileDto,
  },
  query: {
    join: {},
  },
  roles: {
    [RoleType.USER]: [CrudActions.ReadOne],
  },
})
@ApiTags('auth')
@Controller('me')
@UseAppGuard()
@CrudAuth({
  property: 'user',
  filter: (user) => ({
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    id: user.id,
  }),
})
export class UserProfileController implements CrudController<UserEntity> {
  constructor(public service: UserService) {}

  get base(): CrudController<UserEntity> {
    return this;
  }

  @Override()
  async getOne(@AuthUser() user: UserEntity): Promise<UserEntity> {
    return user;
  }
}
