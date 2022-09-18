const db = require("../models");

async function db_loader(app){
    db.sequelize.sync();
    return;
}

module.exports = db_loader;