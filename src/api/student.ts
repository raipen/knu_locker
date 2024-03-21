import { Router, Request, Response } from 'express';
import errorCatcher from './errorCatcher';
import * as StudentService from '../services/StudentService';
import logger from '../log';

const router = Router();

router.get('/checkDues', errorCatcher(async (req: Request, res: Response) => {
    const userDTO = req.query;
    console.log(`[/API/student/checkDues] ${userDTO.name} ${userDTO.number}`);
    logger(req, "[/API/student/checkDues]", userDTO);
    const result = await StudentService.checkDues(userDTO as { name: string, number: string });
    res.status(200).json(result);
}));

router.post('/checkStudent', errorCatcher(async (req: Request, res: Response) => {
    const userDTO = req.body;
    console.log(`[/API/student/checkStudent] ${userDTO.name} ${userDTO.studentId}`);
    logger(req, "[/API/student/checkStudent]", userDTO);
    const result = await StudentService.checkStudent(userDTO);
    res.status(200).json(result);
}));

export default router;
