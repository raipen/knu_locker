const express = require('express');
const router = express.Router();
const logger = require('../log');
const {errorCatcher,errorHandling} = require('./asyncErrorWraper');
const hackathonService = require('../services/hackathonService');

router.post('/apply',errorCatcher(async (req,res)=>{
    const userDTO = req.body;
    console.log(`[/hackathon/apply] ${userDTO.team} ${userDTO.member[0].name}`);
    logger(req,"[/hackathon/apply]",userDTO);
    const result = await hackathonService.apply(userDTO);
    res.status(200).json(result);
}));

router.use('/status',errorCatcher(async (req,res)=>{
  console.log(`[/hackathon/status]`);
  logger(req, "[/hackathon/status]",{});
  const result = await hackathonService.status();
  res.status(200).json(result);
}));

router.get('/teamList',errorCatcher(async (req,res)=>{
  console.log(`[/hackathon/teamList]`);
  logger(req, "[/hackathon/teamList]",{});
  const result = await hackathonService.teamList();
  res.status(200).json(result);
}));

router.get('/memberList',errorCatcher(async (req,res)=>{
  console.log(`[/hackathon/memberList]`);
  logger(req, "[/hackathon/memberList]",{});
  const result = await hackathonService.memberList();
  res.status(200).json(result);
}));

router.use(errorHandling);

module.exports = router;