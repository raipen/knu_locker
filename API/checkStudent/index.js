var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var mysql = require('mysql');
const properties = require('/web/properties.js');

module.exports ={
  main:function(request,response){
    var queryData = url.parse(request.url, true).query;
    var connection = mysql.createConnection({
      host     : properties.DBaddress,
      port     : properties.DBport,
      user     : properties.DBuser,
      password : properties.DBpassword,
      database : properties.DBdatabase,
      multipleStatements:true
    });
    connection.connect();

    connection.query(`select * from test_student_list where name= ? and student_id = ?`,[queryData.name,queryData.number],
        function(error,results,fields){
          var temp = {success:true};
          if(error){
            console.log(error);
            temp.success = false;
            temp.error = error;
          }
          else if(results.length==0){
            temp.isStudent=false;
          }else{
            temp.isStudent=true;
          }
          response.writeHead(200);
          response.end(JSON.stringify(temp));
        });
    connection.end();
  }
}
