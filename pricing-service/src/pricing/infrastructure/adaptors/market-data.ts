import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { MarketDataPort } from '../../domain/ports/market-data';
import { GoldPrice } from '../../domain/value-objects/gold-price';
import { InfrastructureException } from 'src/common/exceptions/infrastructure';

@Injectable()
export class HttpMarketDataAdaptor implements MarketDataPort {
  private hostname: string;
  constructor(private readonly httpService: HttpService) {
    this.hostname = process.env.MARKET_DATA_SERVICE_HOSTNAME!;
  }

  async get() {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<{ price: number }>(
          this.hostname + '/market-data/gold',
        ),
      );

      return new GoldPrice(data.price);
    } catch (error) {
      throw new InfrastructureException('Cannot fetch market data', error);
    }
  }
}
