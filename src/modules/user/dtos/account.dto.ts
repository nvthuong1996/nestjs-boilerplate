import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AccountDto {
  @ApiProperty()
  @ApiPropertyOptional()
  email: string | null;

  @ApiProperty()
  @ApiPropertyOptional()
  password: string | null;
}
