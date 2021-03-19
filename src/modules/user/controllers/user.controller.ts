import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '@nestjsx/crud';

import { UserDto } from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UseAppGuard } from '../../../decorators/app-guard';
import { AppCrud } from '../../../decorators/crud.decorator';

@AppCrud({
  model: {
    type: UserEntity,
  },
  dto: {
    create: UserDto,
    update: UserDto,
    replace: UserDto,
  },
  query: {
    join: {
      account: {
        eager: true,
      },
    },
  },
  routes: {
    only: ['createManyBase'],
  },
  roles: {},
})
@ApiTags('user')
@Controller('user')
@UseAppGuard()
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) {}

  get base(): CrudController<UserEntity> {
    return this;
  }
}
