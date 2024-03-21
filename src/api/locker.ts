import express, { Router, Request, Response, NextFunction } from 'express';
import errorCatcher from './errorCatcher';
import * as LockerService from '../services/LockerService';
import logger from '../log';

const router = Router();

router.post('/apply', errorCatcher(async (req: Request, res: Response) => {
  const userDTO = req.body;
  const cookies = req.cookies;
  console.log(`[/api/locker/apply] ${userDTO.name} ${userDTO.studentId} ${cookies.access_token}`);
  logger(req,"[/api/locker/apply]",userDTO);
  const result = await LockerService.apply(userDTO,cookies.access_token);
  res.status(200).json(result);
}));

router.get('/result', errorCatcher(async (req: Request, res: Response) => {
  console.log(`[/api/locker/result] ${req.cookies.access_token}`);
  logger(req,"[/api/locker/result]",{access_token:req.cookies.access_token});
  const result = await LockerService.result(req.cookies.access_token);
  res.status(200).json(result);
}));

export default router;
