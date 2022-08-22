const { Router } = require('express');

const app = Router();
app.use('/API/', require('./api1'));

module.exports = app;