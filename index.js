var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('/web/template/template.js');

module.exports ={
  main:function(request,response){
    var _url = request.url;
    if(_url == '/favicon.ico'){
      response.writeHead(200);
      response.end(fs.readFileSync("./favicon.ico"));
      return;
    }
    response.writeHead(302, {'Location': '/apply/'});
    response.end();
    // response.writeHead(200);
    // response.end(template.result_html(`<link rel="stylesheet" type="text/css" href="/css/apply.css"/>`,fs.readFileSync("./index.html")));
  }
}
