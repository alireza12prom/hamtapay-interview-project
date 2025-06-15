import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { OrderOrmEntity } from './src/order/dal/orm-entities/order';
import { InventoryOrmEntity } from './src/order/dal/orm-entities/inventory';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [OrderOrmEntity, InventoryOrmEntity],
  synchronize: false,
});
