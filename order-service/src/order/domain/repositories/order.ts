import { OrderEntity } from '../entities/order';
import { TypeORMRepository } from '../../../lib/repository';

export abstract class OrderRepository extends TypeORMRepository<OrderRepository> {
  abstract save(entity: OrderEntity): Promise<void>;
  abstract getById(id: string): Promise<OrderEntity | null>;
}
