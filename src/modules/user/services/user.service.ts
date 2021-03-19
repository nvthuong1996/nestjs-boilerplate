import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFile } from '../../../interfaces/IFile';
import { UserRegisterDto } from '../../auth/dtos/user-register.dto';
import { AccountEntity } from '../entities/account.entity';
import { UserEntity } from '../entities/user.entity';
import { AccountService } from './account.service';
import { ConfigService } from '../../../shared/services/config.service';
import { TypeOrmCrudService } from '../../../common/typeorm-crud.service';
import { RoleType } from '../../../common/constants/role-type';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @Inject(forwardRef(() => AccountService))
    public readonly accountService: AccountService,
    @InjectRepository(AccountEntity)
    public readonly accountRepo: Repository<AccountEntity>,
    @InjectRepository(UserEntity)
    public repo: Repository<UserEntity>,
  ) {
    super(repo);
  }

  async registerUser(
    userRegisterDto: UserRegisterDto,
    file: IFile,
  ): Promise<any> {
    return this.repo.save({
      account: {
        email: userRegisterDto.email,
        password: userRegisterDto.password,
      },
      fullName: userRegisterDto.fullName,
      roles: [RoleType.USER],
    });
  }
}
