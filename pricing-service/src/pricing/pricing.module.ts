import { Module } from '@nestjs/common';
import { MarketDataService } from './infrastructure/services/market-data';
import { InventoryService } from './infrastructure/services/inventory';
import { PricingRuleService } from './domain/services/pricing-rule';
import { MarketDataPort } from './domain/ports/market-data';
import { InventoryPort } from './domain/ports/inventory';
import { PricingController } from './interfaces/http/controller';
import { CalculatePriceService } from './application/services/pricing';

@Module({
  controllers: [PricingController],
  providers: [
    PricingRuleService,
    CalculatePriceService,
    { provide: MarketDataPort, useClass: MarketDataService },
    { provide: InventoryPort, useClass: InventoryService },
  ],
})
export class PricingModule {}
