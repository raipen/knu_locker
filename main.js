var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var app = http.createServer(function(request,response){
    if(request.headers['user-agent'].includes("Trident")){
      response.writeHead(200);
      response.end('internet explorer is not supported');
      return;
    }
    var _url = request.url;
    console.log(_url);
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/testAPI') {
      const { main } = require('./API/allocate/allocate');
      main(request, response);
    }
    console.log('pathname >> ', pathname);
    pathname = pathname.substr(0,pathname.lastIndexOf('/')+1);
    fs.exists("."+pathname+"index.js",function(exists){
      console.log("exist: "+exists);
      if(exists){
        var main_module = require("."+pathname+"index.js");
        main_module.main(request,response);
      }else{
        response.writeHead(404);
        response.end('404 Not found');
      }
    });
});

app.listen(8080);
