import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AccountDto } from '../dtos/account.dto';
import { AccountEntity } from '../entities/account.entity';
import { AccountService } from '../services/account.service';
import { UseAppGuard } from '../../../decorators/app-guard';

@Crud({
  model: {
    type: AccountEntity,
  },
  dto: {
    create: AccountDto,
    update: AccountDto,
    replace: AccountDto,
  },
  query: {
    join: {},
  },
})
@ApiTags('account')
@Controller('account')
@UseAppGuard()
export class AccountController implements CrudController<AccountEntity> {
  constructor(public service: AccountService) {}

  get base(): CrudController<AccountEntity> {
    return this;
  }
}
