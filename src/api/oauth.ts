import express, { Router, Request, Response, NextFunction } from 'express';
import errorCatcher from './errorCatcher';
import * as  OauthService from '../services/OauthService';
import logger from '../log';

const router = Router();

router.get('/', errorCatcher(async (req: Request, res: Response) => {
    const DTO = req.query as {code:string,error:string};
    console.log(`[/oauth] ${DTO.code} ${DTO.error}`);
    logger(req,"[/oauth]",{code:DTO.code,error:DTO.error});
    const {access_token} = await OauthService.getOauthToken(DTO);
    res.cookie('access_token',access_token,{httpOnly:true});
    res.redirect('/agree');
}));

export default router;
