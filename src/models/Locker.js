module.exports = ({ DataTypes }, sequelize)=>{
	return sequelize.define(
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
	);
}