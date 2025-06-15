import { Injectable } from '@nestjs/common';
import { OrderMapper } from '../mappers/order';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { OrderOrmEntity } from '../orm-entities/order';
import { OrderEntity } from '../../domain/entities/order';
import { OrderRepository as Base } from '../../domain/repositories/order';

@Injectable()
export class OrderRepository implements Base {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly repo: Repository<OrderOrmEntity>,
  ) {}

  async save(entity: OrderEntity) {
    await this.repo.save(OrderMapper.mapToORM(entity));
  }

  async getById(id: string) {
    const result = await this.repo.findOne({ where: { id } });
    return result ? OrderMapper.mapToDomain(result) : null;
  }

  withTransaction(manager: EntityManager) {
    return new OrderRepository(manager.getRepository(OrderOrmEntity));
  }
}
