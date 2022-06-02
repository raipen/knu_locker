var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var mysql = require('mysql');
const properties = require('/web/properties.js');

module.exports ={
  main:function(request,response){
    console.log("asdf");
    var queryData = url.parse(request.url, true).query;
    var connection = mysql.createConnection({
      host     : properties.DBaddress,
      port     : properties.DBport,
      user     : properties.DBuser,
      password : properties.DBpassword,
      database : properties.DBdatabase,
      multipleStatements:true
    });

    var temp = {success:true};
    var query1 = mysql.format(`select * from student_list where name= ? and student_id = ?;`,[queryData.name,queryData.number]);
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
          }
          response.writeHead(200);
          response.end(JSON.stringify(temp));
    });
  }
}
