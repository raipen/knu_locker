module.exports = {
  result_html:function(a,b){
    return `<!doctype html>
    <html>
    <head>
      <title>KNU CSE 사물함</title>
      <meta charset="utf-8">
      <link rel="stylesheet" type="text/css" href="/css/top.css"/>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </head>
    <body>
      ${fs.readFileSync("./template/top.html")}
      <div id="main_container">
      ${fs.readFileSync("./index.html")}
      </div>
    </body>
    </html>`;
  }
}
