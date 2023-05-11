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
import Device from './Device'
import Type from './Type'
import TypeToBrand from './TypeToBrand'

@Table({
  tableName: 'brand',
  timestamps: true,
})
export default class Brand extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number

  @AllowNull(false)
  @NotEmpty
  @Column
  name: number | undefined

  @HasMany(() => Device)
  devices!: Device[]

  @BelongsToMany(() => Type, () => TypeToBrand)
  type!: Type[]
}
