const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config').DB[env];

const db={};
db.Sequelize = Sequelize;
db.sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Student = require('./student')(Sequelize, sequelize);

module.exports = db;