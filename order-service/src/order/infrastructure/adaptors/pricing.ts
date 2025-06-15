import { Injectable } from '@nestjs/common';
import { PricingPort } from '../../domain/ports/pricing';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InfrastructureException } from 'src/common/exceptions/infrastructure';

@Injectable()
export class HttpPricingAdapter implements PricingPort {
  private hostname: string;
  constructor(private readonly httpService: HttpService) {
    this.hostname = process.env.PRICING_SERVICE_HOSTNAME!;
  }

  async get(): Promise<number> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<{ price: number }>(this.hostname + '/price'),
      );

      return data.price;
    } catch (error) {
      throw new InfrastructureException('Cannot fetch price', error);
    }
  }
}
