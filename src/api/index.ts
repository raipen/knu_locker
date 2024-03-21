import {Router, Request, Response, NextFunction} from 'express';
import Sequelize from 'sequelize';
import logger from '../log';
import locker from './locker';
import oauth from './oauth';
import student from './student';
import { ErrorWithStatus }from '../errors';
import axios from 'axios';

const app = Router();
app.use('/student/', student);
app.use('/locker/', locker);
app.use('/oauth/', oauth);
app.use('/ping', (req: Request, res: Response) => {
  res.status(200).json({data: "pong"});
});

const errorHandling = (error: any, req: Request, res: Response, next: NextFunction) => {
  logger(req,"[Error]",{errror:error.message});
  if(error instanceof Sequelize.Error)
    return res.status(400).json({message: "데이터베이스 오류" });
  if(error instanceof ErrorWithStatus)
    return res.status(error.status).json({message: error.message });
  if(axios.isAxiosError(error))
    return res.status(500).json({message: "kakao 로그인 오류" });
  return res.status(500).json({message: "알 수 없는 오류" });
}
app.use(errorHandling);
  

export default app;
