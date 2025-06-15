import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GoldPricePort } from '../../domain/ports/gold-price';
import { InfrastructureException } from '../../../common/exceptions/infrastructure';

@Injectable()
export class HttpGoldPriceAdaptor implements GoldPricePort {
  private key: string;
  private hostname: string;
  constructor(private readonly httpService: HttpService) {
    this.hostname = 'https://brsapi.ir/Api/Market';
    this.key = 'FreeaUGUy3epVGvFyiJ9Kt3tSitOrKRQ';
  }

  /**
   * @description Fetch gold price in Toman
   */
  async get(): Promise<number> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<{ gold: [...any] }>(
          this.hostname + `/Gold_Currency.php?key=${this.key}&section=gold`,
        ),
      );

      return data.gold.at(0).price as number;
    } catch (error) {
      throw new InfrastructureException('Cannot fetch gold price', error);
    }
  }
}
