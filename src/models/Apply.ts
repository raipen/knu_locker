import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import config from '../config';

export interface ApplyModel extends Model<InferAttributes<ApplyModel>, InferCreationAttributes<ApplyModel>> {
  student_id: string;
  phone: string;
  first_floor: string;
  first_height: string;
  second_floor: string;
  second_height: string;
}

export default [
  'apply_' + config.SEMESTER,
  {
    student_id: {
      type: DataTypes.STRING(45),
      primaryKey: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    first_floor: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    first_height: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    second_floor: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    second_height: {
      type: DataTypes.STRING(45),
      allowNull: true,
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
] as const;
