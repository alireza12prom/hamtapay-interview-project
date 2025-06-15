export abstract class GoldPriceRepository {
  abstract save(price: number): Promise<void>;
  abstract get(): Promise<number>;
}
