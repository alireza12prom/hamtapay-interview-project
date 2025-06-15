import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { MarketDataPort } from '../../domain/ports/market-data';
import { GoldPrice } from '../../domain/value-objects/gold-price';

@Injectable()
export class HttpMarketDataAdaptor implements MarketDataPort {
  private hostname: string;
  constructor(private readonly httpService: HttpService) {
    this.hostname = process.env.MARKET_DATA_SERVICE_HOSTNAME!;
  }

  async get() {
    const { data } = await firstValueFrom(
      this.httpService.get<{ price: number }>(
        this.hostname + '/market-data/gold',
      ),
    );

    return new GoldPrice(data.price);
  }
}
