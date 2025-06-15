import { TypeORMRepository } from 'src/lib/repository';
import { InventoryEntity } from '../entities/inventory';

export abstract class InventoryRepository extends TypeORMRepository<InventoryRepository> {
  abstract get(): Promise<InventoryEntity | null>;
  abstract getAndLock(): Promise<InventoryEntity>;
  abstract save(entity: InventoryEntity): Promise<void>;
}
