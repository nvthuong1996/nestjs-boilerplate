import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ContextService } from '../../../providers/context.service';
import { UtilsService } from '../../../providers/utils.service';
import { ConfigService } from '../../../shared/services/config.service';
import { AccountEntity } from '../../user/entities/account.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { AccountService } from '../../user/services/account.service';
import { TokenPayloadDto } from '../dtos/token-payload.dto';
import { UserLoginDto } from '../dtos/user-login.dto';
import { UserService } from '../../user/services/user.service';
import { CommonHttpException } from '../../../exceptions/common-http.exception';
import { AppHttpExceptions } from '../../../common/constants/app-http-exception';

@Injectable()
export class AuthService {
  constructor(
    public readonly jwtService: JwtService,
    public readonly configService: ConfigService,
    public readonly accountService: AccountService,
    public readonly userService: UserService,
  ) {}

  async login(userLoginDto: UserLoginDto): Promise<any> {
    const account = await this.validateAccount(userLoginDto);
    if (!account) {
      throw new CommonHttpException(AppHttpExceptions.INCORRECT_CREDENTIAL);
    }
    const token = await this.createToken(account);
    const user = await this.userService.findOne({
      where: { id: account.userId },
    });

    return { user, ...token };
  }

  async createToken(account: AccountEntity): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.getNumber('BACKEND_JWT_EXPIRATION_TIME'),
      accessToken: await this.jwtService.signAsync({
        id: account.user.id,
      }),
    });
  }

  async validateAccount(userLoginDto: UserLoginDto): Promise<AccountEntity> {
    const account = await this.accountService.findByEmail(userLoginDto.email);
    const isPasswordValid = await UtilsService.validateHash(
      userLoginDto.password,
      account && account.password,
    );
    if (!account || !isPasswordValid) {
      return null;
    }
    return account;
  }
}
