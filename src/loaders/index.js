const cookie_loader = require("./cookie");
const express_loader = require("./express");
const db_loader = require("./db");

async function loaders(app){
    await cookie_loader(app);
    await express_loader(app);
    await db_loader(app);
}

module.exports = loaders;