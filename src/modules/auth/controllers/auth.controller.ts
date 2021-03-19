import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { IFile } from '../../../interfaces/IFile';
import { LoginPayloadDto } from '../dtos/login-payload.dto';
import { UserLoginDto } from '../dtos/user-login.dto';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../user/services/user.service';
import { AppValidator } from '../../../pipes/validation';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    public readonly userService: UserService,
    public readonly authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  userLogin(@Body(AppValidator) userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  async userRegister(
    @Body(AppValidator) userRegisterDto: UserRegisterDto,
    @UploadedFile() file: IFile,
  ): Promise<any> {
    const createdUser = await this.userService.registerUser(
      userRegisterDto,
      file,
    );
    return createdUser;
  }
}
