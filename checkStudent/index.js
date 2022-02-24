var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var mysql = require('mysql');
const properties = require('/web/properties.js');

module.exports ={
  main:function(request,response){
    var connection = mysql.createConnection({
      host     : properties.DBaddress,
      port     : properties.DBport,
      user     : properties.DBuser,
      password : properties.DBpassword,
      database : properties.DBdatabase
    });
    connection.connect();

    connection.query(`select * from student_list where name="박지원"`,
        function(error,results,fields){
          if(error){
            console.log(error);
            return;
          }

          response.writeHead(200);
          response.end(JSON.stringify(results));
        });
  }
}
