import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
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
  @PrimaryKey
  @AutoIncrement
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  basketId: number | undefined

  @BelongsTo(() => User)
  user?: User

  @HasMany(() => Basket_content)
  content!: Basket_content[]
}
