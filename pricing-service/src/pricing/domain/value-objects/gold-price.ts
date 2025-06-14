export class GoldPrice {
  constructor(private readonly value: number) {
    if (value <= 0) throw new Error('Price must be greater than 0');
  }

  get raw(): number {
    return this.value;
  }

  increaseByPercent(percent: number): GoldPrice {
    return new GoldPrice(this.value * (1 + percent / 100));
  }
}
