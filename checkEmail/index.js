var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('/web/template/template.js');
const properties = require('/web/properties.js');
const mysql = require('mysql');

module.exports = {
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

    var query = `SELECT * FROM dbraipen.applicant where token = ? and student_id = ?;`;
    connection.query(query,[queryData.id,queryData.number],
      function(error,results,fields){
      if(error){
        console.log(error);
      }
      console.log(results);
      if(results.length==1){
        connection.query("UPDATE apply_info SET verify = '1' WHERE (student_id = ?);",queryData.number,
          function(error,results,fields){
            var header = `<style>${fs.readFileSync(__dirname+"/index.css")}</style>`;
            response.writeHead(200);
            response.end(template.result_html(header,fs.readFileSync(__dirname+"/index1.html")));
            connection.end();
          });
      }else{
        var header = `<style>${fs.readFileSync(__dirname+"/index.css")}</style>`;
        response.writeHead(200);
        response.end(template.result_html(header,fs.readFileSync(__dirname+"/index2.html")));
        connection.end();
      }
    });
  }
}
