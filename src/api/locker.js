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

router.get('/fetchApply', errorCatcher(async (req, res) => {
  const userDTO = req.query;
  const result = await LockerService.fetchApply(userDTO);
  console.log(`[/users/fetchApply] ${userDTO.name}`);
  res.status(200).json(result);
}));

router.use(errorHandling);

/* router.get('/checkDues',async (req,res)=>{
    var temp = {success:true};
    console.log(req.query);
    var query1 = mysql.format(`select * from student_list where name= ? and student_id = ?;`,[req.query.name,req.query.number]);
    db(query1,
        function(error,results,fields){
          if(error){
            console.log(error);
            temp.success = false;
            temp.error = error;
          }
          console.log(results);
          if(results.length==0){
            temp.isStudent=false;
          }else{
            temp.isStudent=true;
            temp.dues=results[0].dues==1?true:false;
          }res.json(temp);
        });
}); */

module.exports = router;