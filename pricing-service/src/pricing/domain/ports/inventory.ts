import { Inventory } from '../value-objects/inventory';

export abstract class InventoryPort {
  abstract get(): Promise<Inventory>;
}
