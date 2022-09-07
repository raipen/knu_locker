const { Router } = require('express');

const app = Router();
app.use('/',require('./front'));

module.exports = app;