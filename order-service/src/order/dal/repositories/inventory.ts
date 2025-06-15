import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryMapper } from '../mappers/inventory';
import { InventoryOrmEntity } from '../orm-entities/inventory';
import { InventoryEntity } from '../../domain/entities/inventory';
import { InventoryRepository as Base } from '../../domain/repositories/inventory';

@Injectable()
export class InventoryRepository implements Base {
  constructor(
    @InjectRepository(InventoryOrmEntity)
    private readonly repo: Repository<InventoryOrmEntity>,
  ) {}

  async save(entity: InventoryEntity): Promise<void> {
    await this.repo.save(InventoryMapper.mapToORM(entity));
  }

  async get(): Promise<InventoryEntity | null> {
    const result = await this.repo.findOne({
      where: { symbol: 'gold' },
    });
    return result ? InventoryMapper.mapToDomain(result) : null;
  }

  async getAndLock(): Promise<InventoryEntity> {
    const result = await this.repo.findOne({
      where: { symbol: 'gold' },
      lock: { mode: 'pessimistic_write' },
    });
    return InventoryMapper.mapToDomain(result!);
  }

  withTransaction(manager: EntityManager) {
    return new InventoryRepository(manager.getRepository(InventoryOrmEntity));
  }
}
