export class Inventory {
  constructor(
    public readonly initial: number,
    public readonly current: number,
  ) {}

  get percentage(): number {
    return (this.current / this.initial) * 100;
  }
}
