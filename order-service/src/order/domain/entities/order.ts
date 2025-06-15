import * as VO from '../value-objects';

export class OrderEntity {
  private unit: VO.Unit;
  private price: VO.Price;
  private symbol: VO.Symbol;
  private readonly id: VO.ID;
  private createdAt: VO.DateTime;

  constructor(id: string, unit: number, price: number, createdAt: Date) {
    this.id = new VO.ID(id);
    // later we can support more symbols
    this.symbol = new VO.Symbol('gold');
    this.unit = new VO.Unit(unit);
    this.price = new VO.Price(price);
    this.createdAt = new VO.DateTime(createdAt);
  }

  get ID() {
    return this.id;
  }

  get Symbol() {
    return this.symbol;
  }

  get Unit() {
    return this.unit;
  }

  get Price() {
    return this.price;
  }

  get CreatedAt() {
    return this.createdAt;
  }
}
