export abstract class GoldPricePort {
  abstract get(): Promise<number>;
}
