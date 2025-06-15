import { OrderEntity } from 'src/order/domain/entities/order';
import { OrderOrmEntity } from '../orm-entities/order';

export class OrderMapper {
  static mapToORM(entity: OrderEntity): OrderOrmEntity {
    const output = new OrderOrmEntity();
    output.id = entity.ID.getValue();
    output.symbol = entity.Symbol.getValue();
    output.unit = entity.Unit.getValue();
    output.price = entity.Price.getValue();
    output.createdAt = entity.CreatedAt.getValue();

    return output;
  }

  static mapToDomain(entity: OrderOrmEntity): OrderEntity {
    return new OrderEntity(
      entity.id,
      entity.unit,
      entity.price,
      entity.createdAt,
    );
  }
}
