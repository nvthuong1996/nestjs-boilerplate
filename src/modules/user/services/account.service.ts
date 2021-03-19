import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AccountEntity } from '../entities/account.entity';
import { TypeOrmCrudService } from '../../../common/typeorm-crud.service';
import { GeneratorService } from '../../../shared/services/generator.service';

@Injectable()
export class AccountService extends TypeOrmCrudService<AccountEntity> {
  constructor(
    @InjectRepository(AccountEntity) public repo: Repository<AccountEntity>,
    public readonly generatorService: GeneratorService,
  ) {
    super(repo);
  }

  findByEmail(email: string) {
    return this.repo.findOne({ email });
  }
}
