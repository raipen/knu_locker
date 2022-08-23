const { Router } = require('express');

const app = Router();
app.use('/API/', require('./locker'));
app.use('/hackathon/',require('./hackathon'));

module.exports = app;