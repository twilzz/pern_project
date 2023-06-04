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
import Device from './Device'

@Table({
  tableName: 'device_info',
  timestamps: true,
})
export default class Device_info extends Model {
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
  title!: string

  @AllowNull(false)
  @NotEmpty
  @Column
  description!: string

  @BelongsTo(() => Device)
  device!: Device
}
