import {
  AllowNull,
  AutoIncrement,
  Column,
  Default,
  HasMany,
  HasOne,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript'
import Basket from './Basket'
import Rating from './Rating'

@Table({
  tableName: 'user',
  timestamps: true,
})
export default class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number

  @AllowNull(false)
  @NotEmpty
  @Unique
  @Column
  email!: string

  @AllowNull(false)
  @NotEmpty
  @Column
  password!: string

  @AllowNull(false)
  @NotEmpty
  @Default('USER')
  @Column
  role!: string

  @HasOne(() => Basket)
  basketId!: Basket

  @HasMany(() => Rating)
  rating!: Rating[]
}
