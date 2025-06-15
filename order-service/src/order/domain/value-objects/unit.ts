import { ValueObject } from '../../../lib/value-object';

export class Unit extends ValueObject<number> {
  isGreaterEqual(amount: number) {
    return this.value >= amount;
  }
}
