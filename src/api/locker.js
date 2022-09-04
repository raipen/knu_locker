const express = require('express');
const router = express.Router();
const {errorCatcher,errorHandling} = require('./asyncErrorWraper');
const LockerService = require('../services/LockerService');

router.get('/checkDues', errorCatcher(async (req, res) => {
  const userDTO = req.query;
  const result = await LockerService.checkDues(userDTO);
  console.log(`[/users/checkDues] ${userDTO.name}`);
  res.status(200).json(result);
}));

router.post('/fetchApply', errorCatcher(async (req, res) => {
  const userDTO = req.body;
  const result = await LockerService.fetchApply(userDTO);
  console.log(`[/users/fetchApply] ${userDTO.name}`);
  res.status(200).json(result);
}));

router.use(errorHandling);

module.exports = router;