import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import config from '~/config'

const tableName = `${config.DB.MAIN_SCHEMA}.workflows`

export class AddWorkflows1582820170145 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table(
        {
          columns: [
            {
              generationStrategy: 'uuid',
              isGenerated: true,
              isPrimary: true,
              name: 'uuid',
              type: 'uuid',
            },
            {
              isNullable: false,
              name: 'status',
              type: 'enum',
              enum: ['inserted', 'consumed'],
              default: "'inserted'",
            },
            {
              isNullable: false,
              isArray: false,
              name: 'data',
              type: 'jsonb',
            },
            {
              isNullable: false,
              isArray: true,
              name: 'steps',
              type: 'varchar',
            },
          ],
          name: tableName,
        },
      ),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(`${tableName}`)
  }
}
