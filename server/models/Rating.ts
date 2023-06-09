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
import User from './User'

@Table({
  tableName: 'rating',
  timestamps: true,
})
export default class Rating extends Model {
  @ForeignKey(() => User)
  @ForeignKey(() => Device)
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number

  @AllowNull(false)
  @NotEmpty
  @Column
  user_id!: number

  @AllowNull(false)
  @NotEmpty
  @Column
  device!: number

  @AllowNull(false)
  @NotEmpty
  @Column
  rate!: number

  @BelongsTo(() => User)
  userId!: User

  @BelongsTo(() => Device)
  deviceId!: Device
}
