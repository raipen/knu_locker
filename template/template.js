var fs = require('fs');
module.exports = {
  result_html:function(head,body){
    console.log("template");
    return `<!doctype html>
    <html>
    <head>
      <title>KNU CSE 사물함</title>
      <meta charset="utf-8">
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      ${head}
    </head>
    <body>
      ${fs.readFileSync("./template/top.html")}
      ${body}
    </body>
    </html>`;
  }
}
