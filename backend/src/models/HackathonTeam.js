const { DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = sequelize.define(
		'hackathon_team',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			team: {
				type: DataTypes.STRING(45),
				allowNull: true,
			}
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);