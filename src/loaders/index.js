const cookie_loader = require("./cookie");
const express_loader = require("./express");

async function loaders(app){
    await cookie_loader(app);
    await express_loader(app);
}

module.exports = loaders;