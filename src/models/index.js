const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config').DB[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Student = require('./Student')(Sequelize, sequelize);
db.Apply = require('./Apply')(Sequelize, sequelize);

//Student랑 Apply가 student_id로 1:1 관계
db.Student.hasOne(db.Apply, {foreignKey: 'student_id', sourceKey: 'student_id'});
db.Apply.belongsTo(db.Student, {foreignKey: 'student_id', targetKey: 'student_id'});

module.exports = db;