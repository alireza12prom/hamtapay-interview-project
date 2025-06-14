import { GoldPrice } from '../value-objects/gold-price';
import { Inventory } from '../value-objects/inventory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PricingRuleService {
  apply(inventory: Inventory, basePrice: GoldPrice): GoldPrice {
    const percent = inventory.percentage;

    if (percent > 50) return basePrice;
    if (percent > 20) return basePrice.increaseByPercent(5);
    return basePrice.increaseByPercent(10);
  }
}
