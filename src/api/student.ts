import express, { Router, Request, Response, NextFunction } from 'express';
import errorCatcher from './errorCatcher';
import * as LockerService from '../services/LockerService';
import logger from '../log';

const router = Router();

router.get('/checkDues', errorCatcher(async (req: Request, res: Response) => {
    const userDTO = req.query;
    console.log(`[/API/checkDues] ${userDTO.name} ${userDTO.number}`);
    logger(req, "[/API/checkDues]", userDTO);
    const result = await LockerService.checkDues(userDTO as { name: string, number: string });
    res.status(200).json(result);
}));

router.post('/checkStudent', errorCatcher(async (req: Request, res: Response) => {
    const userDTO = req.body;
    console.log(`[/API/checkStudent] ${userDTO.name} ${userDTO.studentId}`);
    logger(req, "[/API/checkStudent]", userDTO);
    const result = await LockerService.checkStudent(userDTO);
    res.status(200).json(result);
}));

export default router;
