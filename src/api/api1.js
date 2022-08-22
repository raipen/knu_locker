const express = require('express');
const { DBaddress, DBuser, DBpassword, DBdatabase, DBport} = require('../config');
const mysql = require('mysql');
const router = express.Router();

function dbConnect(){
  return mysql.createConnection({
    host     : DBaddress,
    port     : DBport,
    user     : DBuser,
    password : DBpassword,
    database : DBdatabase,
    multipleStatements:true
  });
}

router.get('/checkDues',async (req,res)=>{
    var temp = {success:true};
    console.log(req.query)
    console.log(req.query.number);
    var query1 = mysql.format(`select * from student_list where name= ? and student_id = ?;`,[req.query.name,req.query.number]);
    var connection = dbConnect();
    connection.query(query1,
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
    connection.end();
});

module.exports = router;