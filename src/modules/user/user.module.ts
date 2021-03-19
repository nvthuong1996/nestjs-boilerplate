import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountEntity } from './entities/account.entity';
import { UserEntity } from './entities/user.entity';
import { AccountService } from './services/account.service';
import { AccountController } from './controllers/account.controller';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, UserEntity])],
  providers: [AccountService, UserService],
  exports: [AccountService, UserService],
  controllers: [AccountController, UserController],
})
export class UserModule {}
