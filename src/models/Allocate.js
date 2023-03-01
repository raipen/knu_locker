module.exports = ({ DataTypes }, sequelize)=>{
	return sequelize.define(
		'allocated_'+process.env.SEMESTER,
		{
			student_id: {
				type: DataTypes.STRING(45),
				primaryKey: true,
				allowNull: false,
			},
			locker: {
				type: DataTypes.STRING(10),
				allowNull: false,
			}
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
}