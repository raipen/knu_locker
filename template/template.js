var fs = require('fs');
module.exports = {
  result_html:function(head,body){
    console.log("template");
    return `<!doctype html>
    <html>
    <head>
      <title>KNU CSE 사물함</title>
      <meta charset="utf-8">
      <link rel="stylesheet" type="text/css" href="/css/top.css"/>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      ${head}
    </head>
    <body>
      ${fs.readFileSync("./template/top.html")}
      <div id="main_container">
      ${body}
      </div>
    </body>
    </html>`;
  }
}
