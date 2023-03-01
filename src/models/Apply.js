module.exports = ({ DataTypes }, sequelize)=>{
	return sequelize.define(
		'apply_'+process.env.SEMESTER,
		{
			student_id: {
				type: DataTypes.STRING(45),
				primaryKey: true,
				allowNull: false,
			},
			phone:{
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
	);
}