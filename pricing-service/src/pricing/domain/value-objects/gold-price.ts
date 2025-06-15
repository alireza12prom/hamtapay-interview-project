import { ValueObject } from '../../../lib/value-object';

export class GoldPrice extends ValueObject<number> {
  increaseByPercent(percent: number): GoldPrice {
    const amount = this.value * (1 + percent / 100);
    return new GoldPrice(Number(amount.toFixed(2)));
  }
}
