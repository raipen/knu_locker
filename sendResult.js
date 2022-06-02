var mysql = require('mysql');
const nodemailer = require('nodemailer');
const properties = require('/web/properties.js');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,  //다른 포트를 사용해야 되면 false값을 주어야 합니다.
    port: 465,   //구글 메일서버 포트
    auth: {
        user: properties.mailAddress,
        pass: properties.mailPassword
    }
})//너무 많이 시도해서 락 걸렸을 때 https://accounts.google.com/b/0/DisplayUnlockCaptcha

async function sendMail(post) {
    //#1. Transporter 객체 생성

    var heightArr = [["","상","중상","중","중하","하"],["","상","중상","중하","하"]];
    post.height = post.floor=="-1"?heightArr[0][post.height]:heightArr[1][post.height];
    post.floor= post.floor=="-1"?"지하 1":post.floor;
    //#3. 메일 전송, 결과는 info 변수에 담아 집니다.
    let info = await transporter.sendMail({
        from: `"knulocker" <`+properties.mailAddress+`>`,
        to: post.email,//여기에 테스트로 받을 이메일 넣어봐
        subject: '사물함 배정 안내',
        // text:
        // `
        // 안녕하세요.
        // ${verify_address} 입니다.
        // 좋은 하루 보내세요.
        // `,  //텍스트로 보냅니다.
        html:`
        <div style="margin:auto;
        width:fit-content;
        text-align:center;">
          <span style="color: #525252;
            font-size: 28px;
            text-align: center;">사물함 배정이 완료되었습니다</span>
          <br>
          <table class="verify_table" style="margin:10px;
          border-top:1px solid #000;
          border-collapse:collapse;
          background-color:#efefef;
          text-align: left;
          width:100%;">
            <tr>
              <td style="background-color:#f6f6f6;
              position:relative;border-bottom:1px solid #d0d0d0;
              padding:20px 10px;">이름</td><td style="border-bottom:1px solid #d0d0d0;
              padding:20px 10px;">${post.name}</td>
            </tr>
            <tr>
              <td style="background-color:#f6f6f6;
              position:relative;border-bottom:1px solid #d0d0d0;
              padding:20px 10px;">학번</td><td style="border-bottom:1px solid #d0d0d0;
              padding:20px 10px;">${post.student_id}</td>
            </tr>
            <tr>
              <td style="background-color:#f6f6f6;
              position:relative;border-bottom:1px solid #d0d0d0;
              padding:20px 10px;">배정결과</td><td style="border-bottom:1px solid #d0d0d0;
              padding:20px 10px;">${post.locker}</td>
            </tr>
            <tr>
              <td style="background-color:#f6f6f6;
              position:relative;border-bottom:1px solid #d0d0d0;
              padding:20px 10px;">위치</td><td style="border-bottom:1px solid #d0d0d0;
              padding:20px 10px;">${post.floor+"층 "+post.height}</td>
            </tr>
            <tr>
              <td style="background-color:#f6f6f6;
              position:relative;border-bottom:1px solid #d0d0d0;
              padding:20px 10px;">비밀번호</td><td style="border-bottom:1px solid #d0d0d0;
              padding:20px 10px;">${post.pw}</td>
            </tr>
          </table>
          <p>
          문의사항은 학생회 총무부(카카오톡 아이디: je12370)으로 문의해주세요.
          </p>
        </div>`
    })
    console.log("완료");
    console.log(post);
    //#4. 전송 후 결과 단순 출력
    for(let key in info){
        console.log('키 : '+key + ', 값 : ' + info[key])
    }
}

async function asdf(results){
  for(var res in results){
    if(results[res].name!="강민정") continue;
    console.log(results[res]);
    await sendMail(results[res]);
  }
}

//mysql 연결
var connection = mysql.createConnection({
  host     : properties.DBaddress,
  port     : properties.DBport,
  user     : properties.DBuser,
  password : properties.DBpassword,
  database : properties.DBdatabase,
  multipleStatements:true
});
connection.query(`SELECT a.*,phone_number,email,pw,name FROM assigned_locker as a join applicant as b on a.student_id = b.student_id join locker_info as c on a.locker = c.locker join student_list as d on a.student_id = d.student_id order by student_id;`,
  function(error,results,fields){
    asdf(results);
    // for(var res in results){
    //   if(res==1||res==0) continue;
    //   console.log(results[res]);
    //   sendMail(results[res]);
    // }

  });//select 쿼리 끝

connection.end();
