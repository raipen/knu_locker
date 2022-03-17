var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var mysql = require('mysql');
const properties = require('/web/properties.js');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

async function sendMail(post,verify_address) {
    //#1. Transporter 객체 생성
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: true,  //다른 포트를 사용해야 되면 false값을 주어야 합니다.
        port: 465,   //구글 메일서버 포트
        auth: {
            user: properties.mailAddress,
            pass: properties.mailPassword
        }
    })
    console.log("post");
    console.log(post);
    var heightArr = [["","상","중상","중","중하","하"],["","상","중상","중하","하"]];
    post.first_height = post.first_floor=="-1"?heightArr[0][post.first_height]:heightArr[1][post.first_height];
    post.second_height = post.second_floor=="-1"?heightArr[0][post.second_height]:heightArr[1][post.second_height];
    post.first_floor= post.first_floor=="-1"?"지하 1":post.first_floor;
    post.second_floor= post.second_floor=="-1"?"지하 1":post.second_floor;
    //#3. 메일 전송, 결과는 info 변수에 담아 집니다.
    let info = await transporter.sendMail({
        from: `"knulocker" <`+properties.mailAddress+`>`,
        to: post.email,//여기에 테스트로 받을 이메일 넣어봐
        subject: '이메일 인증을 완료해주세요(KNU CSE 2022학년도 1학기 사물함 배정)',
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
            text-align: center;">신청 정보 확인 후 이메일 인증하기를 눌러주세요</span>
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
              padding:20px 10px;">${post.number}</td>
            </tr>
            <tr>
              <td style="background-color:#f6f6f6;
              position:relative;border-bottom:1px solid #d0d0d0;
              padding:20px 10px;">전화번호</td><td style="border-bottom:1px solid #d0d0d0;
              padding:20px 10px;">${post.phone_number}</td>
            </tr>
            <tr>
              <td style="background-color:#f6f6f6;
              position:relative;border-bottom:1px solid #d0d0d0;
              padding:20px 10px;">1지망</td><td style="border-bottom:1px solid #d0d0d0;
              padding:20px 10px;">${post.first_floor+"층 "+post.first_height}</td>
            </tr>
            <tr>
              <td style="background-color:#f6f6f6;
              position:relative;border-bottom:1px solid #d0d0d0;
              padding:20px 10px;">2지망</td><td style="border-bottom:1px solid #d0d0d0;
              padding:20px 10px;">${post.second_floor+"층 "+post.second_height}</td>
            </tr>
          </table>
          <button class="verify_button" style="background: #d03473;
          font-weight: 500;
          cursor: pointer;
          padding: 0 10px;
          min-width: 180px;
          line-height: 55px;
          font-size: 18px;
          border: none;">
            <a style="color: #ffffff; text-decoration: none;" href="https://raipen.gabia.io/checkEmail/?number=${post.number}&id=${verify_address}">이메일 인증하기</a>
          </button>
        </div>`
    })

    //#4. 전송 후 결과 단순 출력
    for(let key in info){
        console.log('키 : '+key + ', 값 : ' + info[key])
    }
}

module.exports ={
  main:function(request,response){
    var body = '';
    request.on('data', function (data) {
        body += data;
        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6)
            request.connection.destroy();
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var queryData = qs.parse(body);
      console.log(post);
      //값 확인
      var temp = {isOK:false};
      temp.values = {
        name: /^[가-힣| ]+$/.test(queryData.name),
        id : /^[0-9]{10}$/.test(queryData.number),
        phone:/^010-?([0-9]{4})-?([0-9]{4})$/.test(queryData.phone_number),
        email:/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@knu.ac.kr$/.test(queryData.email),
        want : !(queryData.first_floor==queryData.second_floor&&queryData.first_height==queryData.second_height)
      }

      temp.isOK = temp.values.name&&temp.values.id&&temp.values.phone&&temp.values.email&&temp.values.want
      console.log(temp);
      //명부 확인
      if(!temp.isOK){
        response.writeHead(200);
        response.end(JSON.stringify(temp));
        return;
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
      var query1 = mysql.format(`select * from student_list where name= ? and student_id = ?;`,[queryData.name,queryData.number]);
      var query2 = mysql.format(`select * from student_list where name= ? and student_id is NULL;`,[queryData.name]);
      connection.query(query1+query2,
          function(error,results,fields){
            console.log("results");
            console.log(results);
            temp.studentSearch = true;
            var dues = 0;
            if(error){
              console.log(error);
              temp.studentSearch = false;
              temp.error = error;
              response.writeHead(200);
              response.end(JSON.stringify(temp));
            }
            else if(results[0].length==0&&results[1].length==0){  //명부에 존재하지 않는 경우
              temp.isStudent=false;
              response.writeHead(200);
              response.end(JSON.stringify(temp));
            }else{//명부에 존재
              temp.isStudent=true;
              if(results[0].length==0){ //명부에 학번은 없는데 이름만 있는 경우
                console.log("update std_list");
                dues = results[1][0].dues;
                connection.query(`UPDATE student_list SET student_id = ? WHERE (id = ?);`,[queryData.number,results[1][0].id],
                    function(error,results,fields){
                      console.log("results");
                      console.log(results);
                      if(error){
                        console.log(error);
                      }
                });
              }else{
                dues = results[0][0].dues;
              }
            }

            if(temp.isStudent){//student가 아닌 경우는 위에서 처리 완료 else 안해도 됨
              connection.query(`SELECT * FROM dbraipen.apply_info where student_id = ?`,[post.number],
                function(error,results,fields){
                  temp.applySearch = true;
                  if(error){
                    temp.applySearch = false;
                    temp.error = error;
                    console.log(error);
                    response.writeHead(200);
                    response.end(JSON.stringify(temp));
                  }
                  if(results.length==0) temp.isApplied = false;
                  else temp.isApplied = true;

                  if(temp.isApplied&&results[0].verify){ //이미 신청된 정보가 있는 정보
                    temp.isVerify = true;
                    response.writeHead(200);
                    response.end(JSON.stringify(temp));
                  }else if(temp.isApplied&&post.update==1){
                    temp.isVerify = false;
                    const salt = crypto.randomBytes(64).toString('base64');
                    const hashPassword = crypto.createHash('sha512').update(post.email + salt).digest('hex');
                    var query1 = mysql.format('UPDATE `dbraipen`.`applicant` SET `phone_number` = ?, `email` = ?, `salt` = ?, `token` = ? WHERE (`student_id` = ?);',[post.phone_number,post.email,salt,hashPassword,post.number]);
                    var query2 = mysql.format('UPDATE `dbraipen`.`apply_info` SET `first_floor` = ?, `first_height` = ?, `second_floor` = ?, `second_height` = ? WHERE (`student_id` = ?);',[post.first_floor,post.first_height,post.second_floor,post.second_height,post.number]);
                    connection.query(query1+query2,
                        function(error,results,fields){
                          temp.apply_success = true;
                          if(error){
                            temp.apply_success = false;
                            temp.error = error;
                            console.log(error);
                          }
                          else{
                            console.log("results");
                            console.log(results);
                            sendMail(post,hashPassword);
                          }
                          response.writeHead(200);
                          response.end(JSON.stringify(temp));
                    });
                  }else if(temp.isApplied){
                    temp.isVerify = false;
                    response.writeHead(200);
                    response.end(JSON.stringify(temp));
                  }else{//신규 신청
                    const salt = crypto.randomBytes(64).toString('base64');
                    const hashPassword = crypto.createHash('sha512').update(post.email + salt).digest('hex');
                    var query1 = mysql.format('INSERT INTO `dbraipen`.`applicant` (`student_id`, `phone_number`, `email`, `salt`, `token`) VALUES (?, ?, ?, ?, ?);',[post.number,post.phone_number,post.email,salt,hashPassword]);
                    var query2 = mysql.format('INSERT INTO `dbraipen`.`apply_info` (`student_id`, `dues`, `verify`, `first_floor`, `first_height`, `second_floor`, `second_height`) VALUES (?, ?, ?, ?, ?, ?, ?)',[post.number,dues,0,post.first_floor,post.first_height,post.second_floor,post.second_height]);
                    connection.query(query1+query2,
                        function(error,results,fields){
                          temp.apply_success = true;
                          if(error){
                            temp.apply_success = false;
                            temp.error = error;
                            console.log(error);
                          }
                          else{
                            console.log("results");
                            console.log(results);
                            sendMail(post,hashPassword);
                          }
                          response.writeHead(200);
                          response.end(JSON.stringify(temp));
                    });
                  }
              });//
            }//if(isStudent)
          });//select 쿼리 끝
      });
  }
}
