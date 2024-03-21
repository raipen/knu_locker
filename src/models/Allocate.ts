import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import config from '../config';

export interface AllocateModel extends Model<InferAttributes<AllocateModel>, InferCreationAttributes<AllocateModel>> {
  student_id: string;
  locker: string;
}

export default [
  `allocated_${config.SEMESTER}`,
  {
    student_id: {
      type: DataTypes.STRING(45),
      primaryKey: true,
      allowNull: false,
    },
    locker: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
] as const;
