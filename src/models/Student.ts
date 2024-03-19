import { DataTypes } from 'sequelize';
import config from '../config';

export default [
  'student_list',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    student_id: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: true,
    },
    dues: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
] as const;
