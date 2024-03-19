import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

export interface StudentModel extends Model<InferAttributes<StudentModel>, InferCreationAttributes<StudentModel>> {
  id: number;
  name: CreationOptional<string>;
  student_id: CreationOptional<string>;
  dues: CreationOptional<number>;
}
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
