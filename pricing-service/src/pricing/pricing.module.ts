import { Module } from '@nestjs/common';
import { HttpMarketDataAdaptor } from './infrastructure/adaptors/market-data';
import { HttpInventoryAdaptor } from './infrastructure/adaptors/inventory';
import { PricingRuleService } from './domain/services/pricing-rule';
import { MarketDataPort } from './domain/ports/market-data';
import { InventoryPort } from './domain/ports/inventory';
import { PricingController } from './interfaces/http/controller';
import { CalculatePriceUseCase } from './application/usecases/pricing';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PricingController],
  providers: [
    PricingRuleService,
    CalculatePriceUseCase,
    { provide: MarketDataPort, useClass: HttpMarketDataAdaptor },
    { provide: InventoryPort, useClass: HttpInventoryAdaptor },
  ],
})
export class PricingModule {}
