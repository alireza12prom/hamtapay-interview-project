import { ValueObject } from '../../../lib/value-object';

export class Unit extends ValueObject<number> {
  validate() {
    if (this.value < 0) throw new Error('Price is not a valid VO');
  }

  isGreaterEqual(amount: number) {
    return this.value >= amount;
  }
}
