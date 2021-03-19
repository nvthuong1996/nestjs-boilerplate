import { ValidationPipe } from '@nestjs/common';

export const AppValidator = new ValidationPipe({
  transform: true,
  disableErrorMessages: false,
});
