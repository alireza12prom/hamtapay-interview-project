import { Injectable } from '@nestjs/common';
import { BaseException } from 'src/common/exceptions/base';
import { InfrastructureException } from 'src/common/exceptions/infrastructure';
import { UnexpectedException } from 'src/common/exceptions/unexpected';
import { UseCase } from 'src/lib/usecase';
import { InventoryPort } from 'src/pricing/domain/ports/inventory';
import { MarketDataPort } from 'src/pricing/domain/ports/market-data';
import { PricingRuleService } from 'src/pricing/domain/services/pricing-rule';

type Input = undefined;
type Output = {
  price: number;
};

@Injectable()
export class CalculatePriceUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly marketData: MarketDataPort,
    private readonly inventoryRepo: InventoryPort,
    private readonly pricingRuleService: PricingRuleService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(input?: Input): Promise<Output> {
    try {
      const price = await this.marketData.get();
      const inventory = await this.inventoryRepo.get();

      const adjustedPrice = this.pricingRuleService.apply(inventory, price);
      return { price: adjustedPrice.getValue() };
    } catch (error) {
      if (error instanceof BaseException) throw error;
      throw new UnexpectedException('price calculation failed', error);
    }
  }
}
