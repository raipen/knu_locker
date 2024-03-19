const { Router,static } = require('express');
const path = require('path');

const app = Router();
app.use(static(path.join(__dirname, '../../react/build')));
app.use('/api/', require('./locker'));
app.use('/API/', require('./locker'));
app.use('/test/', require('./test'));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+ '../../../react/build/index.html'));
});
module.exports = app;
