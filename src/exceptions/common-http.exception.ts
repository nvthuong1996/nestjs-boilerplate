'use strict';

export interface ICommonHttpException {
  statusCode: number;
  code: string;
  message: string;
}

export class CommonHttpException extends Error {
  error: ICommonHttpException;
  constructor(error: ICommonHttpException) {
    super();
    this.error = error;
  }
}
