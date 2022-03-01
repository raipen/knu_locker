var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('/web/template/template.js');

module.exports = {
  main:function(request,response){
    var queryData = url.parse(request.url, true).query;
    response.writeHead(200);
    var header = `<script type="text/javascript">
    ${fs.readFileSync(__dirname+"/apply.js")}
    </script>
    <link rel="stylesheet" type="text/css" href="../css/common.css"/>
    <link rel="stylesheet" type="text/css" href="../css/contents.css"/>
    <link rel="stylesheet" type="text/css" href="../css/default.css"/>
    <link rel="stylesheet" type="text/css" href="../css/reset.css"/>
    <link rel="stylesheet" type="text/css" href="../css/slick.css"/>
    <link rel="stylesheet" type="text/css" href="../css/table.css"/>
    <link rel="stylesheet" type="text/css" href="../css/font.css"/>
    <style>${fs.readFileSync(__dirname+"/index.css")}</style>`;
    response.end(template.result_html(header,fs.readFileSync(__dirname+"/index.html")));
  }
}
