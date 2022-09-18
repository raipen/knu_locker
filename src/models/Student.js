module.exports = ({ DataTypes }, sequelize)=>{
	return sequelize.define(
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
	);
}