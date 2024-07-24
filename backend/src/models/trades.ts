import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Trade extends Model<Trade> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  requesterId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  requestedId!: number;

  @Column({
    type: DataType.STRING,
    defaultValue: 'pending',
  })
  status!: string;
}
