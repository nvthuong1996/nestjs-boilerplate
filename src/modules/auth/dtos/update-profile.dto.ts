import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Matches } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty()
  @ApiPropertyOptional()
  fullname: string | null;

  @ApiProperty()
  @ApiPropertyOptional()
  avatar: string | null;

  @ApiProperty()
  @ApiPropertyOptional()
  @Matches(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
  phone: string | null;

  @ApiProperty()
  @ApiPropertyOptional()
  firstName: string | null;

  @ApiProperty()
  @ApiPropertyOptional()
  lastName: string | null;

  @Exclude()
  role: string;

  @Exclude()
  id: string;

  @Exclude()
  createdAt: string;

  @Exclude()
  updatedAt: string;
}
