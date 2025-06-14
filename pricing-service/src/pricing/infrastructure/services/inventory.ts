import { Injectable } from '@nestjs/common';
import { InventoryPort } from '../../domain/ports/inventory';
import { Inventory } from '../../domain/value-objects/inventory';

@Injectable()
export class InventoryService implements InventoryPort {
  constructor() {}

  async get(): Promise<Inventory> {
    // TODO: You would call the Order Service
    const initial = 100;
    const current = 34;

    return Promise.resolve(new Inventory(initial, current));
  }
}
