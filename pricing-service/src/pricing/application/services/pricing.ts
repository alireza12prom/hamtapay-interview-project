import { Injectable } from '@nestjs/common';
import { InventoryPort } from 'src/pricing/domain/ports/inventory';
import { MarketDataPort } from 'src/pricing/domain/ports/market-data';
import { PricingRuleService } from 'src/pricing/domain/services/pricing-rule';

@Injectable()
export class CalculatePriceService {
  constructor(
    private readonly marketData: MarketDataPort,
    private readonly inventoryRepo: InventoryPort,
    private readonly pricingRuleService: PricingRuleService,
  ) {}

  async execute(): Promise<number> {
    const price = await this.marketData.get();
    const inventory = await this.inventoryRepo.get();

    const adjustedPrice = this.pricingRuleService.apply(inventory, price);
    return adjustedPrice.raw;
  }
}
