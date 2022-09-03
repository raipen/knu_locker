const express = require('express');
const db = require('../db/mysql');
const mysql = require('mysql');
const router = express.Router();

router.post('/apply',async (req,res)=>{
    console.log(req.body);
    if(!checkTeamName(req.body.team))
      return res.status(400).send({error: '잘못된 입력'});
    var teamName = req.body.team.trim();
    var newTeamQuery = mysql.format(`INSERT INTO hackathon_team (team) VALUES (?);`,[teamName]);
    
    var leaderInfo = readLeaderInfo(teamName,req.body.member[0]);
    if(!checkLeaderInfo(leaderInfo))
      return res.status(400).send({error:"잘못된 입력"});
    var addMemberQuery = mysql.format(`INSERT INTO hackathon_member (team, name, student_number, member_type, phone_number, github) VALUES (?, ?, ?, ?, ?, ?);`,leaderInfo);
    if(req.body.member.length>4)
      return res.status(400).send({error:"잘못된 입력"});
    for(var i = 1; i<req.body.member.length;i++){
      var memberInfo = readMemberInfo(teamName,req.body.member[i]);
      if(!checkMemberInfo(memberInfo))
        return res.status(400).send({error:"잘못된 입력"});
      addMemberQuery += mysql.format(`INSERT INTO hackathon_member (team, name, student_number, member_type) VALUES (?, ?, ?, ?);`,memberInfo);
    }
    console.log(newTeamQuery + addMemberQuery);
    db(newTeamQuery + addMemberQuery,(error,results,fields)=>sendQueryResult(error,results,fields,res));
});

router.use('/status',async (req,res)=>{
  var query = `SELECT count(*) as c FROM hackathon_team;SELECT count(*) as c FROM hackathon_member;`
  db(query,(error,results)=>{
    if(error){
      console.log(error);
      return res.status(400).send({success:false,error:"오류Q"});
    }
    console.log(results);
    res.json({team:results[0][0].c,applicant:results[1][0].c});
  });
});

router.post('/initialization',async (req,res)=>{
  var query = `TRUNCATE hackathon_team;TRUNCATE hackathon_member;`
  db(query,(error,results)=>{
    if(error){
      console.log(error);
      return res.status(400).send({success:false,error:"오류Q"});
    }
    console.log(results);
    res.json({success:true});
  });
});

router.get('/teamList',async (req,res)=>{
  var query = `SELECT * FROM hackathon_team;`
  db(query,(error,results)=>{
    if(error){
      console.log(error);
      return res.status(400).send({success:false,error:"오류Q"});
    }
    console.log(results);
    res.json(results);
  });
});

router.get('/memberList',async (req,res)=>{
  var query = `SELECT * FROM hackathon_member;`
  db(query,(error,results)=>{
    if(error){
      console.log(error);
      return res.status(400).send({success:false,error:"오류Q"});
    }
    console.log(results);
    res.json(results);
  });
});

function checkTeamName(team){
  if(team==undefined||team==null) return false;
  return true;
  const teamNameReg = /^[가-힣|a-z|A-Z|0-9| ]+$/;
  if (teamNameReg.test(team))
    return true;
  else
    return false;
}

function readLeaderInfo(teamName,leader){
  if(leader==undefined||leader==null) return null;
  return [teamName,leader.name,leader.student_number,"leader",leader.phone_number,leader.github];
}

function checkLeaderInfo(leader){
  console.log(leader);
  if(leader==null) return false;
  const teamNameReg = /^[가-힣|a-z|A-Z|0-9| ]+$/;
  const nameReg = /^[가-힣| ]+$/;
  const student_numberReg = /^[0-9]{10}$/;
  const phone_numberReg = /^010-?([0-9]{4})-?([0-9]{4})$/;
  const githubReg = /^[a-zA-Z0-9_-]+$/;
  if (student_numberReg.test(leader[2])&&phone_numberReg.test(leader[4]))
    return true;
  else
    return false;
}

function readMemberInfo(teamName,member){
  if(member==undefined||member==null) return null;
  return [teamName,member.name,member.student_number,"member"];
}

function checkMemberInfo(member){
  console.log(member);
  if(member==null) return false;
  const teamNameReg = /^[가-힣|a-z|A-Z|0-9| ]+$/;
  const nameReg = /^[가-힣| ]+$/;
  const student_numberReg = /^[0-9]{10}$/;
  if (student_numberReg.test(member[2]))
    return true;
  else
    return false;
}

function sendQueryResult(error,results,fields,res){
  if(error){
    console.log(error);
    return res.status(400).send({success:false,error:"오류Q"});
  }
  res.json({success:true});
}

module.exports = router;