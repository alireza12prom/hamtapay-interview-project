import { GoldPrice } from '../value-objects/gold-price';

export abstract class MarketDataPort {
  abstract get(): Promise<GoldPrice>;
}
