const { Router } = require('express');

const app = Router();
app.use('/API/', require('./locker'));
app.use('/hackathon/',require('./hackathon'));
app.use('/test/', require('./test'));

module.exports = app;