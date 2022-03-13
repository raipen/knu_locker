var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('/web/template/template.js');

module.exports = {
  main:function(request,response){
    var queryData = url.parse(request.url, true).query;
    response.writeHead(200);
    var header = `<style>${fs.readFileSync(__dirname+"/index.css")}</style>`;
    response.end(template.result_html(header,fs.readFileSync(__dirname+"/index"+queryData.floor+".html")));
  }
}
