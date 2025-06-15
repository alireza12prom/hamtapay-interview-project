import { InventoryEntity } from 'src/order/domain/entities/inventory';
import { InventoryRepository } from '../repositories/inventory';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class InventorySeeds implements OnModuleInit {
  private readonly logger = new Logger(InventorySeeds.name);

  constructor(
    @Inject('InventoryRepository')
    private readonly inventoryRepo: InventoryRepository,
  ) {}

  async onModuleInit(): Promise<void> {
    const existing = await this.inventoryRepo.get();

    if (!existing) {
      const initial = parseInt(process.env.INITIAL_INVENTORY ?? '100');

      const inventory = new InventoryEntity(randomUUID(), initial, initial);
      await this.inventoryRepo.save(inventory);

      this.logger.log(`Initialized inventory with ${initial} units`);
    } else {
      this.logger.log('Inventory already exists');
    }
  }
}
