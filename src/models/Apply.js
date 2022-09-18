const { DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = sequelize.define(
		'apply_2022_2',
		{
			student_id: {
				type: DataTypes.STRING(45),
				primaryKey: true,
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
	);