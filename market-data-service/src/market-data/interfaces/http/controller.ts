import { Controller, Get } from '@nestjs/common';
import { FetchPriceUseCase } from 'src/market-data/application/usecases/fetch-price';

@Controller({ path: 'market-data', version: '1' })
export class MarketDataController {
  constructor(private readonly fetchPriceUseCase: FetchPriceUseCase) {}

  @Get('/gold')
  async get() {
    const response = await this.fetchPriceUseCase.execute();
    return response;
  }
}
