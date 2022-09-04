const { DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = sequelize.define(
		'applicant2',
		{
			student_id: {
				type: DataTypes.STRING(45),
				primaryKey: true,
				allowNull: false,
			},
			phone_number: {
				type: DataTypes.STRING(45),
				allowNull: true,
			},
            token: {
				type: DataTypes.STRING(45),
				allowNull: true,
			}
		},
		{
			freezeTableName: true,
			timestamps: true,
		}
	);