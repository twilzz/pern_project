import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import Brand from './Brand'
import Type from './Type'

@Table({
  tableName: 'typeToBrand',
  timestamps: true,
})
export default class TypeToBrand extends Model {
  @ForeignKey(() => Type)
  @Column
  typeId!: number

  @ForeignKey(() => Brand)
  @Column
  brandId!: number
}
