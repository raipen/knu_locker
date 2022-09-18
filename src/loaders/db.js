const db = require("../models");

async function db_loader(app){
    db.sequelize.sync({force: false, alter: false});
    return;
}

module.exports = db_loader;