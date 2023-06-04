import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import Basket_content from './Basket_content'
import User from './User'

@Table({
  tableName: 'basket',
  timestamps: true,
})
export default class Basket extends Model {
  @ForeignKey(() => User)
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number

  @AllowNull(false)
  @NotEmpty
  @Column
  user_id!: number

  @BelongsTo(() => User)
  userId!: User

  @HasMany(() => Basket_content)
  content!: Basket_content[]
}
