import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import Basket from './Basket'
import Device from './Device'

@Table({
  tableName: 'basket_content',
  timestamps: true,
})
export default class Basket_content extends Model {
  @ForeignKey(() => Basket)
  @ForeignKey(() => Device)
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number

  @AllowNull(false)
  @NotEmpty
  @Column
  device_id!: number

  @AllowNull(false)
  @NotEmpty
  @Column
  basket_id!: number

  @BelongsTo(() => Basket)
  basketId!: Basket

  @BelongsTo(() => Device)
  deviceId!: Device
}
