import { Column, Default, HasOne, Model, Table } from 'sequelize-typescript'
import Basket from './Basket'

@Table({
  tableName: 'users',
  timestamps: true,
})
export default class User extends Model {
  @Column
  email!: string

  @Column
  password!: string

  @Default('USER')
  @Column
  role!: string

  @HasOne(() => Basket)
  basketId!: Basket

  // @HasMany(() => Rating)
  // rating!: Rating[]
}
