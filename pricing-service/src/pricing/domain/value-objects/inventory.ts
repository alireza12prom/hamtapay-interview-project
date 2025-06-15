import { ValueObject } from '../../../lib/value-object';

export class Inventory extends ValueObject<{
  initial: number;
  current: number;
}> {
  get percentage(): number {
    return (this.value.current / this.value.initial) * 100;
  }
}
