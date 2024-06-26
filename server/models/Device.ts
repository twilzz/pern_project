import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import Basket_content from './Basket_content'
import Brand from './Brand'
import Device_info from './Device_info'
import Rating from './Rating'
import Type from './Type'

@Table({
  tableName: 'device',
  timestamps: true,
})
export default class Device extends Model {
  @ForeignKey(() => Type)
  @ForeignKey(() => Brand)
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number

  @AllowNull(false)
  @NotEmpty
  @Column
  model!: string

  @Column
  price!: number

  @AllowNull(true)
  @NotEmpty
  @Column
  rating!: number

  @AllowNull(true)
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  image!: string[]

  @AllowNull(true)
  @Column
  type_id!: number

  @AllowNull(true)
  @Column
  brand_id!: number

  @HasMany(() => Device_info)
  info!: Device_info[]

  @BelongsTo(() => Type)
  typeId!: Type

  @BelongsTo(() => Brand)
  brandId!: Brand

  @HasMany(() => Rating)
  ratings!: Rating[]

  @HasMany(() => Basket_content)
  basket!: Basket_content[]
}
