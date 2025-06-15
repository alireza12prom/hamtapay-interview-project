import { Injectable } from '@nestjs/common';
import { PricingPort } from '../../domain/ports/pricing';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpPricingAdapter implements PricingPort {
  private hostname: string;
  constructor(private readonly httpService: HttpService) {
    this.hostname = process.env.PRICING_SERVICE_HOSTNAME!;
  }

  async get(): Promise<number> {
    const { data } = await firstValueFrom(
      this.httpService.get<{ price: number }>(this.hostname + '/price'),
    );

    return data.price;
  }
}
