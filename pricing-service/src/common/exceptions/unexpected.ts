import { BaseException } from './base';

export class UnexpectedException extends BaseException {
  readonly cause?: Error;
  constructor(message: string, cause?: Error) {
    super(message);
    this.cause = cause;
  }
}
