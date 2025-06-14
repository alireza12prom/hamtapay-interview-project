import { Controller, Get } from '@nestjs/common';
import { CalculatePriceService } from 'src/pricing/application/services/pricing';

@Controller({ path: 'price', version: '1' })
export class PricingController {
  constructor(private readonly calculatePrice: CalculatePriceService) {}

  @Get('/')
  async get(): Promise<{ price: number }> {
    const price = await this.calculatePrice.execute();
    return { price: parseFloat(price.toFixed(2)) };
  }
}
