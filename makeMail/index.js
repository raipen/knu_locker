var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('/web/template/template.js');

module.exports = {
  main:function(request,response){
    if(request.url.endsWith(".png")){
      response.writeHead(200);
      response.end(fs.readFileSync("/web"+request.url));
      return;
    }
    var queryData = url.parse(request.url, true).query;
    response.writeHead(200);
    var header = `<style>${fs.readFileSync(__dirname+"/index2.css")}</style>`;
    response.end(template.result_html(header,fs.readFileSync(__dirname+"/index2.html")));
  }
}
