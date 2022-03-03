var fs = require('fs');
module.exports = {
  result_html:function(head,body){
    console.log("template");
    return `<!doctype html>
    <html>
    <head>
      <title>KNU CSE 사물함</title>
      <meta charset="utf-8">
      <link rel="stylesheet" type="text/css" href="../css/contents.css"/>
      <link rel="stylesheet" type="text/css" href="../css/default.css"/>
      <link rel="stylesheet" type="text/css" href="../css/reset.css"/>
      <link rel="stylesheet" type="text/css" href="../css/slick.css"/>
      <link rel="stylesheet" type="text/css" href="../css/table.css"/>
      <link rel="stylesheet" type="text/css" href="../css/font.css"/>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      ${head}
      <link rel="stylesheet" type="text/css" href="/css/top.css"/>
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
