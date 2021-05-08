import { MigrationInterface, QueryRunner } from 'typeorm'
import config from '~/config'

const appSchema = config.DB.MAIN_SCHEMA

export class CreateDatabaseSchema1582816030292 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      create schema if not exists ${appSchema};

      grant all privileges on schema ${appSchema} to ${config.DB.USER};
    `)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
