var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('/web/template/template.js');

module.exports = {
  main:function(request,response){
    if(request.url.endsWith(".jpg")){
      response.writeHead(200);
      response.end(fs.readFileSync("/web"+request.url));
      return;
    }
    var queryData = url.parse(request.url, true).query;
    if(queryData.floor==-1||queryData.floor==1||queryData.floor==3){
      var header = `<style>${fs.readFileSync(__dirname+"/index.css")}</style>`;
      response.writeHead(200);
      response.end(template.result_html(header,fs.readFileSync(__dirname+"/index"+queryData.floor+".html")));
    }else{
      response.writeHead(200);
      response.end(template.result_html("","사물함이 존재하지 않는 층입니다"));
    }
  }
}
