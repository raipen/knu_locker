import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

export interface LockerModel extends Model<InferAttributes<LockerModel>, InferCreationAttributes<LockerModel>> {
  locker: string;
  floor: number;
  height: number;
  pw: string;
}

export default [
  'locker_info',
  {
    locker: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false,
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pw: {
      type: DataTypes.STRING(4),
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
] as const;
