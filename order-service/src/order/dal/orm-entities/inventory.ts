import { Entity, Column, PrimaryGeneratedColumn, Check } from 'typeorm';

@Entity('inventory')
export class InventoryOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  symbol: string;

  @Check(`"initial" >= 0`)
  @Column({ type: 'int', default: 0 })
  initial: number;

  @Check(`"current" >= 0`)
  @Column({ type: 'int', default: 0 })
  current: number;
}
