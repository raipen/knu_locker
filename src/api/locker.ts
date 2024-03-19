import express, { Router, Request, Response, NextFunction } from 'express';
import errorCatcher from './errorCatcher';
import * as LockerService from '../services/LockerService';
import logger from '../log';

const router = Router();

router.get('/kakaoId', errorCatcher(async (req: Request, res: Response) => {
  res.status(200).json({kakaoId:process.env.KAKAOID||"경북대학교 학생회 통합공지방 확인"});
}));

router.get('/checkDues', errorCatcher(async (req: Request, res: Response) => {
  const userDTO = req.query;
  console.log(`[/API/checkDues] ${userDTO.name} ${userDTO.number}`);
  logger(req,"[/API/checkDues]",userDTO);
  const result = await LockerService.checkDues(userDTO as {name:string,number:string});
  res.status(200).json(result);
}));

router.post('/fetchApply', errorCatcher(async (req: Request, res: Response) => {
  const userDTO = req.body;
  console.log(`[/API/fetchApply] ${userDTO.name} ${userDTO.phone}`);
  logger(req,"[/API/fetchApply]",userDTO);
  const result = await LockerService.fetchApply(userDTO);
  res.status(200).json(result);
}));

router.post('/apply', errorCatcher(async (req: Request, res: Response) => {
  const userDTO = req.body;
  const cookies = req.signedCookies;
  console.log(`[/API/apply] ${userDTO.name} ${userDTO.studentId} ${cookies.phone}`);
  logger(req,"[/API/apply]",userDTO);
  const result = await LockerService.apply(userDTO,cookies);
  res.status(200).json(result);
}));

router.post('/checkStudent', errorCatcher(async (req: Request, res: Response) => {
  const userDTO = req.body;
  console.log(`[/API/checkStudent] ${userDTO.name} ${userDTO.studentId}`);
  logger(req,"[/API/checkStudent]",userDTO);
  const result = await LockerService.checkStudent(userDTO);
  res.status(200).json(result);
}));

router.get("/status", errorCatcher(async (req: Request, res: Response) => {
  res.status(200).json(await LockerService.status());
}));

export default router;
