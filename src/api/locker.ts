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
  const cookies = req.signedCookies;
  console.log(`[/API/apply] ${userDTO.name} ${userDTO.studentId} ${cookies.phone}`);
  logger(req,"[/API/apply]",userDTO);
  const result = await LockerService.apply(userDTO,cookies);
  res.status(200).json(result);
}));

router.post('/fetchApply', errorCatcher(async (req: Request, res: Response) => {
  const userDTO = req.body;
  console.log(`[/API/fetchApply] ${userDTO.name} ${userDTO.phone}`);
  logger(req,"[/API/fetchApply]",userDTO);
  const result = await LockerService.fetchApply(userDTO);
  res.status(200).json(result);
}));

export default router;
