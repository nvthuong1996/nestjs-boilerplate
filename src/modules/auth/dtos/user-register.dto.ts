'use strict';

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly fullName?: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email?: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty({ minLength: 6 })
  readonly password?: string;

  @IsOptional()
  @Matches(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
  @ApiProperty()
  phone?: string;
}
