import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  HasMany,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import Brand from './Brand'
import Device from './Device'
import TypeToBrand from './TypeToBrand'

@Table({
  tableName: 'type',
  timestamps: true,
})
export default class Type extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number

  @AllowNull(false)
  @NotEmpty
  @Column
  name!: string

  @HasMany(() => Device)
  devices!: Device[]

  @BelongsToMany(() => Brand, () => TypeToBrand)
  brands!: Brand[]
}
