import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import config from '../config';

export interface ApplyModel extends Model<InferAttributes<ApplyModel>, InferCreationAttributes<ApplyModel>> {
  student_id: string;
  phone: string;
  kakao_id: string;
  first_floor: number;
  first_height: number;
  second_floor: number;
  second_height: number;
}

export default [
  'apply_' + config.SEMESTER,
  {
    student_id: {
      type: DataTypes.STRING(45),
      primaryKey: true,
      allowNull: false,
    },
    kakao_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    first_floor: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    first_height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    second_floor: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    second_height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
] as const;
