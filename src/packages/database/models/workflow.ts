// tslint:disable:variable-name
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import config from '~/config'
import { WorkflowType } from '~/packages/api/common/constants'

@Entity(`${config.DB.MAIN_SCHEMA}.workflows`)
export class Workflow extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string

  @Column({ default: WorkflowType.INSERTED })
  public status: WorkflowType

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  public data: string

  @Column('varchar', { array: true })
  public steps: string[]
}
