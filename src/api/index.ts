import express, {Router, Request, Response, NextFunction} from 'express';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config';
import logger from '../log';
import locker from './locker';
import oauth from './oauth';
import student from './student';

const app = Router();
app.use('/student/', student);
app.use('/locker/', locker);
app.use('/oauth/', oauth);

const errorHandling = (error: any, req: Request, res: Response, next: NextFunction) => {
  logger(req,"[Error]",{errror:error.message});
  if(error instanceof Sequelize.Error)
    return res.status(400).json({success: false, message: "database error" });
  else
    res.status(400).json({success: false, message: error.message })
}
app.use(errorHandling);
  

export default app;
