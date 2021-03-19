import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AccountDto } from './account.dto';
import { RoleType } from '../../../common/constants/role-type';

export class UserDto {
  @ApiProperty()
  @ApiPropertyOptional()
  avatar: string | null;

  @ApiProperty()
  @ApiPropertyOptional()
  phone: string | null;

  @ApiProperty()
  roles: RoleType[];

  @ApiProperty({
    type: AccountDto,
    isArray: true,
  })
  @ApiPropertyOptional()
  account: AccountDto;
}
