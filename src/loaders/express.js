const express = require('express');
const cors = require('cors');
const api = require("../api");

async function express_loader(app){
    // Middle-ware settings
    app.use(cors());
    console.log("cors");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // API Route
    app.use(require("../api"));
    return;
}

module.exports = express_loader;