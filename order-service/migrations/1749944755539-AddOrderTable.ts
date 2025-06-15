import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddOrderTable1749944755539 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'symbol', type: 'varchar' },
          { name: 'unit', type: 'int' },
          { name: 'price', type: 'double precision' },
          { name: 'createdAt', type: 'timestamp without time zone' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order');
  }
}
