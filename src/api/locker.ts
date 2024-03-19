import express, { Router, Request, Response, NextFunction } from 'express';
import errorCatcher from './errorCatcher';
import * as LockerService from '../services/LockerService';
import logger from '../log';

const router = Router();

router.get('/kakaoId', errorCatcher(async (req: Request, res: Response) => {
  res.status(200).json({kakaoId:process.env.KAKAOID||"경북대학교 학생회 통합공지방 확인"});
}));

router.get("/status", errorCatcher(async (req: Request, res: Response) => {
  res.status(200).json(await LockerService.status());
}));

router.post('/apply', errorCatcher(async (req: Request, res: Response) => {
  const userDTO = req.body;
  const cookies = req.cookies;
  console.log(`[/api/locker/apply] ${userDTO.name} ${userDTO.studentId} ${cookies.phone}`);
  logger(req,"[/api/locker/apply]",userDTO);
  const result = await LockerService.apply(userDTO,cookies);
  res.status(200).json(result);
}));

router.post('/result', errorCatcher(async (req: Request, res: Response) => {
  const userDTO = req.body;
  console.log(`[/api/locker/result] ${userDTO.name} ${userDTO.phone}`);
  logger(req,"[/api/locker/result]",userDTO);
  const result = await LockerService.result(userDTO);
  res.status(200).json(result);
}));

export default router;
