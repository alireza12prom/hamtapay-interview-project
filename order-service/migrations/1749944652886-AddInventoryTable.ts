import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddInventoryTable1749944652886 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'inventory',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'symbol', type: 'varchar', isUnique: true },
          { name: 'current', type: 'int' },
          { name: 'initial', type: 'int' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('inventory');
  }
}
