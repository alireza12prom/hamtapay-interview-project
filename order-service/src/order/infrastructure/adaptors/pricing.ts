import { Injectable } from '@nestjs/common';
import { PricingPort } from '../../domain/ports/pricing';

@Injectable()
export class HttpPricingAdapter implements PricingPort {
  constructor() {}

  async get(): Promise<number> {
    // TODO: Call the pricing service
    return Promise.resolve(1800);
  }
}
