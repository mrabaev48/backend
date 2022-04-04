import { Column, DataType, Table, Model } from 'sequelize-typescript';
import {DataTypes} from "sequelize";
import {Field, ID, ObjectType} from "@nestjs/graphql";

interface PositionCreation {
  title: string;
  location: string;
  applyButtonUrl: string;
  description: string;
}

@ObjectType({ description: 'Position ' })
@Table({ tableName: 'Positions', createdAt: false, updatedAt: false })
export class Position extends Model<Position, PositionCreation> {
  @Field(type => ID)
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    type: DataType.INTEGER,
  })
  id: number;
  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
  @Field()
  @Column({
    type: DataTypes.STRING(10000),
    allowNull: false,
  })
  description: string;
  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location: string;
  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  applyButtonURL: string;
}
