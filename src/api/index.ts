import express,{Router, Request, Response, NextFunction} from 'express';
import path from 'path';
import Sequelize from 'sequelize';
import logger from '../log';
import locker from './locker';
import config from '../config';

const app = Router();
if(config.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../../react/dist')));
}
app.use('/api/', locker);
app.use('/API/', locker);
app.use('/oauth/', require('./oauth'));
if(config.NODE_ENV === "production"){
  app.get('*',(req,res)=>{
      res.sendFile(path.join(__dirname+ '../../../react/dist/index.html'));
  });
}

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    logger(req,"[Error]",{errror:error.message});
    if(error instanceof Sequelize.Error)
      return res.status(400).json({success: false, message: "database error" });
    else
      res.status(400).json({success: false, message: error.message })
});
  

export default app;
