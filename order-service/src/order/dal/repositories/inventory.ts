import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { InventoryMapper } from '../mappers/inventory';
import { InventoryOrmEntity } from '../orm-entities/inventory';
import { InventoryEntity } from '../../domain/entities/inventory';
import { InventoryRepository as Base } from '../../domain/repositories/inventory';
import { InfrastructureException } from 'src/common/exceptions/infrastructure';

@Injectable()
export class InventoryRepository implements Base {
  constructor(
    @InjectRepository(InventoryOrmEntity)
    private readonly repo: Repository<InventoryOrmEntity>,
  ) {}

  async save(entity: InventoryEntity): Promise<void> {
    try {
      await this.repo.save(InventoryMapper.mapToORM(entity));
    } catch (error) {
      throw new InfrastructureException('Cannot save data to DB', error);
    }
  }

  async get(): Promise<InventoryEntity | null> {
    try {
      const result = await this.repo.findOne({
        where: { symbol: 'gold' },
      });
      return result ? InventoryMapper.mapToDomain(result) : null;
    } catch (error) {
      throw new InfrastructureException('Cannot fetch data from DB', error);
    }
  }

  async getAndLock(): Promise<InventoryEntity> {
    try {
      const result = await this.repo.findOne({
        where: { symbol: 'gold' },
        lock: { mode: 'pessimistic_write' },
      });
      return InventoryMapper.mapToDomain(result!);
    } catch (error) {
      throw new InfrastructureException('Cannot fetch data from DB', error);
    }
  }

  withTransaction(manager: EntityManager) {
    return new InventoryRepository(manager.getRepository(InventoryOrmEntity));
  }
}
