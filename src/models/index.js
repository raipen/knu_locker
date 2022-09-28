const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config').DB[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Student = require('./Student')(Sequelize, sequelize);
db.Apply = require('./Apply')(Sequelize, sequelize);
db.Locker = require('./Locker')(Sequelize, sequelize);
db.Allocate = require('./Allocate')(Sequelize, sequelize);

//Student랑 Apply가 student_id로 1:1 관계
db.Student.hasOne(db.Apply, {foreignKey: 'student_id', sourceKey: 'student_id'});
db.Apply.belongsTo(db.Student, {foreignKey: 'student_id', targetKey: 'student_id'});

//Apply랑 Allocate가 student_id로 1:1 관계
//Allocate랑 Locker가 locker로 1:1 관계
db.Apply.hasOne(db.Allocate, {foreignKey: 'student_id', sourceKey: 'student_id', as: 'allocate'});
db.Allocate.belongsTo(db.Apply, {foreignKey: 'student_id', targetKey: 'student_id'});
db.Locker.hasOne(db.Allocate, {foreignKey: 'locker', targetKey: 'locker', as: 'allocate'});
db.Allocate.belongsTo(db.Locker, {foreignKey: 'locker', sourceKey: 'locker'});

module.exports = db;