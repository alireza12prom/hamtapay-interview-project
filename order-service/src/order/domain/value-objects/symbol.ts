import { ValueObject } from '../../../lib/value-object';

export class Symbol extends ValueObject<string> {
  validate(): void {
    return;
  }
}
