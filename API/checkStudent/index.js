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
    var temp = {success:true};
    var query1 = mysql.format(`select * from student_list where name= ? and student_id = ?;`,[queryData.name,queryData.number]);
    var query2 = mysql.format(`select * from student_list where name= ? and student_id is NULL;`,[queryData.name]);
    connection.query(query1+query2,
        function(error,results,fields){
          console.log("results");
          console.log(results);
          if(error){
            console.log(error);
            temp.success = false;
            temp.error = error;
          }
          else if(results[0].length==0&&results[1].length==0){
            temp.isStudent=false;
            response.writeHead(200);
            response.end(JSON.stringify(temp));
          }else{
            temp.isStudent=true;
            if(results[0].length==0){
              console.log("update std_list");
              connection.query(`UPDATE student_list SET student_id = ? WHERE (id = ?);`,[queryData.number,results[1][0].id],
                  function(error,results,fields){
                    console.log("results");
                    console.log(results);
                    if(error){
                      console.log(error);
                    }
                    response.writeHead(200);
                    response.end(JSON.stringify(temp));
              });
            }else{
              response.writeHead(200);
              response.end(JSON.stringify(temp));
            }
          }
        });
  }
}
