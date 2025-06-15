import { Controller, Get } from '@nestjs/common';
import { CalculatePriceUseCase } from '../../application/usecases/pricing';

@Controller({ path: 'price', version: '1' })
export class PricingController {
  constructor(private readonly calculatePriceUseCase: CalculatePriceUseCase) {}

  @Get('/')
  async get() {
    const result = await this.calculatePriceUseCase.execute();
    return result;
  }
}
