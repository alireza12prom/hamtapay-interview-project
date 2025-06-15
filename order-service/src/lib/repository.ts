import { EntityManager } from 'typeorm';

export abstract class TypeORMRepository<T> {
  abstract withTransaction(manager: EntityManager): T;
}
