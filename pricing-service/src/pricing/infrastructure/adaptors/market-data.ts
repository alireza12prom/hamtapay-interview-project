import { Injectable } from '@nestjs/common';
import { MarketDataPort } from 'src/pricing/domain/ports/market-data';
import { GoldPrice } from 'src/pricing/domain/value-objects/gold-price';

@Injectable()
export class HttpMarketDataAdaptor implements MarketDataPort {
  async get(): Promise<GoldPrice> {
    // TODO: You would call the Market Data Service
    return Promise.resolve(new GoldPrice(1800));
  }
}
