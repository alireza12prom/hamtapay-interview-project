import { InventoryOrmEntity } from '../orm-entities/inventory';
import { InventoryEntity } from '../../domain/entities/inventory';

export class InventoryMapper {
  static mapToORM(entity: InventoryEntity): InventoryOrmEntity {
    const output = new InventoryOrmEntity();
    output.id = entity.ID.getValue();
    output.symbol = entity.Symbol.getValue();
    output.current = entity.Current.getValue();
    output.initial = entity.Initial.getValue();

    return output;
  }

  static mapToDomain(entity: InventoryOrmEntity): InventoryEntity {
    return new InventoryEntity(entity.id, entity.initial, entity.current);
  }
}
