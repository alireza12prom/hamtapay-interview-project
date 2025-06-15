import { BaseException } from './base';

export class DomainException extends BaseException {
  readonly code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}
