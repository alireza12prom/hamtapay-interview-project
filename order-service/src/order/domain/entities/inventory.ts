import * as VO from '../value-objects';

export class InventoryEntity {
  private readonly id: VO.ID;
  private symbol: VO.Symbol;
  private initial: VO.Unit;
  private current: VO.Unit;

  constructor(id: string, initial: number, current: number) {
    this.id = new VO.ID(id);
    // later we can support more symbols
    this.symbol = new VO.Symbol('gold');
    this.initial = new VO.Unit(initial);
    this.current = new VO.Unit(current);
  }

  get ID() {
    return this.id;
  }

  get Symbol() {
    return this.symbol;
  }

  get Initial() {
    return this.initial;
  }

  get Current() {
    return this.current;
  }

  decrease(unit: number) {
    if (!this.current.isGreaterEqual(unit)) return false;
    this.current = new VO.Unit(this.current.getValue() - unit);
    return true;
  }

  isEnough(unit: number) {
    return this.current.isGreaterEqual(unit);
  }
}
