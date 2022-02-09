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
    response.writeHead(200);
    var style = `<style>
      form{
        position: absolute;
        top: 20px;
        left: 50%;
        display: inline;
        transform: translate(-50%,0);
        min-width: 260px;
      }
      fieldset{
        display: inline;
      }
    </style>`
    var result = template.result_html(style,fs.readFileSync(__dirname+"/index.html"));
    response.end(result);
  }
}
