import { Column, DataType, Table, Model } from 'sequelize-typescript';

interface PositionCreation {
  title: string;
  location: string;
  applyButtonUrl: string;
  description: string;
}

@Table({ tableName: 'Positions' })
export class Position extends Model<Position, PositionCreation> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    type: DataType.INTEGER,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  applyButtonURL: string;
}
