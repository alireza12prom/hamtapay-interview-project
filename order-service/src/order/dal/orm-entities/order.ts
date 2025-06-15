import { Entity, Column, PrimaryGeneratedColumn, Check } from 'typeorm';

@Entity('order')
export class OrderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  symbol: string;

  @Check(`"unit" > 0`)
  @Column({ type: 'int' })
  unit: number;

  @Check(`"price" > 0`)
  @Column({ type: 'double precision' })
  price: number;

  @Column({ type: 'timestamp without time zone', name: 'created_at' })
  createdAt: Date;
}
