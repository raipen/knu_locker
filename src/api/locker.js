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
  console.log(`[/API/fetchApply] ${userDTO.name} ${userDTO.phone}`);
  logger(req,"[/API/fetchApply]",userDTO);
  const result = await LockerService.fetchApply(userDTO);
  res.status(200).json(result);
}));

router.post('/sendCertificationCode', errorCatcher(async (req, res) => {
  const userDTO = req.body;
  console.log(`[/API/verifyCode] ${userDTO.phone}`);
  logger(req,"[/API/verifyCode]",userDTO);
  const code = await LockerService.sendCertificationCode(userDTO);
  const result = await LockerService.generateCertificationCookie(userDTO,code);
  res.cookie(result.key, result.value, {maxAge: 300000,signed: true});
  res.status(200).json({success:true});
}));

router.post('/checkCertificationCode', errorCatcher(async (req, res) => {
  const userDTO = req.body;
  const cookies = req.signedCookies;
  console.log(`[/API/check] ${userDTO.phone} ${userDTO.code}`);
  logger(req,"[/API/check]",userDTO);
  const isVeryfied = await LockerService.checkCertificationCode(userDTO,cookies);
  if(isVeryfied){
    const result = await LockerService.generateVerifiedPhoneCookie(userDTO);
    res.cookie(result.key, result.value, {signed: true});
  }
  res.status(200).json({success:isVeryfied});
}));

router.post('/apply', errorCatcher(async (req, res) => {
  const userDTO = req.body;
  const cookies = req.signedCookies;
  console.log(`[/API/apply] ${userDTO.name} ${userDTO.studentId} ${cookies.phone}`);
  logger(req,"[/API/apply]",userDTO);
  const result = await LockerService.apply(userDTO,cookies);
  res.status(200).json(result);
}));

router.post('/checkStudent', errorCatcher(async (req, res) => {
  const userDTO = req.body;
  console.log(`[/API/checkStudent] ${userDTO.name} ${userDTO.studentId}`);
  logger(req,"[/API/checkStudent]",userDTO);
  const result = await LockerService.checkStudent(userDTO);
  res.status(200).json(result);
}));

router.use(errorHandling);

module.exports = router;