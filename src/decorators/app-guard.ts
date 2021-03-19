// eslint-disable-next-line @typescript-eslint/naming-convention
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { AuthorizeGuard } from '../guards/roles.guard';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UseAppGuard = () => UseGuards(AuthGuard, AuthorizeGuard);
