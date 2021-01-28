import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateDoctors1611711159123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doctors',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar(120)',
          },
          {
            name: 'crm',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'phoneF',
            type: 'varchar',
          },
          {
            name: 'phoneC',
            type: 'varchar',
          },
          {
            name: 'cep',
            type: 'varchar',
          },
          {
            name: 'specialties',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctors');
  }
}
