var fs = require('fs');
module.exports = {
  result_html:function(head,body){
    console.log("template");
    return `<!doctype html>
    <html>
    <head>
      <title>KNU CSE 사물함</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="../css/contents.css"/>
      <link rel="stylesheet" type="text/css" href="../css/default.css"/>
      <link rel="stylesheet" type="text/css" href="../css/reset.css"/>
      <link rel="stylesheet" type="text/css" href="../css/slick.css"/>
      <link rel="stylesheet" type="text/css" href="../css/sf.css"/>
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
        <p class="col-12 tm-copyright-text mb-0">
        Copyright &copy; Knu CSE student 
        <a href="https://www.instagram.com/keep._.hun/" rel="nofollow" class="tm-copyright-link">@keep._.hun</a>
        <a href="https://www.instagram.com/ji1_bahk/" rel="nofollow" class="tm-copyright-link">@ji1_bahk</a>
        <a href="https://www.instagram.com/ggodong_v/" rel="nofollow" class="tm-copyright-link">@ggodong_v</a>
        <a href="https://www.instagram.com/hyunseo._.0_2/" rel="nofollow" class="tm-copyright-link">@hyunseo._.0_2</a>
        </p>
      </div>
    </body>
    </html>`;
  }
}
