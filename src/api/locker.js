const express = require('express');
const router = express.Router();
const {errorCatcher,errorHandling} = require('./asyncErrorWraper');
const LockerService = require('../services/LockerService');
const logger = require('../log');

router.get('/checkDues', errorCatcher(async (req, res) => {
  const userDTO = req.query;
  console.log(`[/API/checkDues] ${userDTO.name} ${userDTO.number}`);
  logger(req,"[/API/checkDues]",userDTO);
  const result = await LockerService.checkDues(userDTO);
  res.status(200).json(result);
}));

router.post('/fetchApply', errorCatcher(async (req, res) => {
  const userDTO = req.body;
  console.log(`[/API/fetchApply] ${userDTO.name} ${userDTO.number}`);
  logger(req,"[/API/fetchApply]",userDTO);
  const result = await LockerService.fetchApply(userDTO);
  res.status(200).json(result);
}));

router.post('/sendCertificationCode', errorCatcher(async (req, res) => {
  const userDTO = req.body;
  console.log(`[/API/verifyCode] ${userDTO.phone}`);
  logger(req,"[/API/fetchApply]",userDTO);
  const code = await LockerService.sendCertificationCode(userDTO);
  const result = await LockerService.generateCertificationCookie(userDTO,code);
  res.cookie(result.key, result.code, {maxAge: 300000,signed: true});
  res.status(200).json({seccess:true});
}));

router.post('/checkCertificationCode', errorCatcher(async (req, res) => {
  const userDTO = req.body;
  const cookies = req.signedCookies;
  console.log(`[/API/check] ${userDTO.phone} ${userDTO.code}`);
  logger(req,"[/API/check]",userDTO);
  const isVeryfied = await LockerService.checkCertificationCode(userDTO,cookies);
  if(isVeryfied){
    const result = await LockerService.generateVerifiedPhoneCookie(userDTO);
    res.cookie(result.key, result.code, {signed: true});
  }
  res.status(200).json({success:isVeryfied});
}));

router.use(errorHandling);

module.exports = router;