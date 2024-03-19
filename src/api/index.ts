import express, { Router } from 'express';
import path from 'path';

const app = Router();
app.use(express.static(path.join(__dirname, '../../react/dist')));
app.use('/api/', require('./locker'));
app.use('/API/', require('./locker'));
app.use('/oauth/', require('./oauth'));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+ '../../../react/dist/index.html'));
});

export default app;
