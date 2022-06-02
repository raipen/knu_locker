const { Router } = require('express');

const app = Router();
app.use('/api/', require('./api1'));

module.exports = app;