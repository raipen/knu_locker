var fs = require('fs');
var url = require('url');
var qs = require('querystring');
const properties = require('/web/properties.js');
var mysql = require('mysql');

module.exports ={
  main:function(){

    var connection = mysql.createConnection({
      host     : properties.DBaddress,
      port     : properties.DBport,
      user     : properties.DBuser,
      password : properties.DBpassword,
      database : properties.DBdatabase
    });

    connection.connect();

    var select_query = `select * from room1_progress WHERE (user_id = '${queryData.id}');`
    connection.query(select_query,
      function(error,results,fields){
        if(error){
          console.log(error);
          return;
        }
    });
    connection.end();
  }
}
