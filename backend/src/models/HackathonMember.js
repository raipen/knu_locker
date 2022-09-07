const { DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = sequelize.define(
		'hackathon_member',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			team: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
            name: {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            student_number: {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            member_type: {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            phone_number: {
                type: DataTypes.STRING(45),
                allowNull: true
            },
            github: {
                type: DataTypes.STRING(200),
                allowNull: true
            },
            department: {
                type: DataTypes.STRING(45),
                allowNull: true
            }
		},
		{
			freezeTableName: true,
			timestamps: true,
		}
	);