const express = require('express');
const router = express.Router();
const {errorCatcher,errorHandling} = require('./asyncErrorWraper');
const LockerService = require('../services/LockerService');
const logger = require('../log');

router.get('/checkDues', errorCatcher(async (req, res) => {
  const userDTO = req.query;
  console.log(`[/users/checkDues] ${userDTO.name} ${userDTO.number}`);
  logger(req,"[/users/checkDues]",userDTO);
  const result = await LockerService.checkDues(userDTO);
  res.status(200).json(result);
}));

router.post('/fetchApply', errorCatcher(async (req, res) => {
  const userDTO = req.body;
  console.log(`[/users/fetchApply] ${userDTO.name} ${userDTO.number}`);
  logger(req,"[/users/fetchApply]",userDTO);
  const result = await LockerService.fetchApply(userDTO);
  res.status(200).json(result);
}));

router.use(errorHandling);

module.exports = router;