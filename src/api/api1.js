const express = require('express');
const db = require('../db/mysql');
const mysql = require('mysql');
const router = express.Router();

router.get('/checkDues',async (req,res)=>{
    var temp = {success:true};
    console.log(req.query)
    console.log(req.query.number);
    var query1 = mysql.format(`select * from student_list where student_id = ?;`,[req.query.number]);
    db.connection.query(query1,
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
          }
          res.json(temp);
    });
    db.connection.end();
});

module.exports = router;