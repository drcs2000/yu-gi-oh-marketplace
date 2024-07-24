import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Card extends Model<Card> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column(DataType.TEXT)
  description!: string;
}
