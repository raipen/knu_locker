var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var mysql = require('mysql');
const properties = require('/web/properties.js');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

async function sendMail(email,number,verify_address) {
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

    //#3. 메일 전송, 결과는 info 변수에 담아 집니다.
    let info = await transporter.sendMail({
        from: `"knulocker" <`+properties.mailAddress+`>`,
        to: email,//여기에 테스트로 받을 이메일 넣어봐
        subject: '테스트 메일제목입니다.',
        // text:
        // `
        // 안녕하세요.
        // ${verify_address} 입니다.
        // 좋은 하루 보내세요.
        // `,  //텍스트로 보냅니다.
        html:`<div><a href="https://raipen.gabia.io/checkEmail/?number=${number}&id=${verify_address}">이메일 인증하기</a></div>`
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


      //mysql 연결
      var connection = mysql.createConnection({
        host     : properties.DBaddress,
        port     : properties.DBport,
        user     : properties.DBuser,
        password : properties.DBpassword,
        database : properties.DBdatabase,
        multipleStatements:true
      });
      var temp = {success:false};
      var query1 = mysql.format(`select * from student_list where name= ? and student_id = ?;`,[queryData.name,queryData.number]);
      var query2 = mysql.format(`select * from student_list where name= ? and student_id is NULL;`,[queryData.name]);
      connection.query(query1+query2,
          function(error,results,fields){
            console.log("results");
            console.log(results);
            temp.success = true;
            if(error){
              console.log(error);
              temp.success = false;
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
                connection.query(`UPDATE student_list SET student_id = ? WHERE (id = ?);`,[queryData.number,results[1][0].id],
                    function(error,results,fields){
                      console.log("results");
                      console.log(results);
                      if(error){
                        console.log(error);
                      }
                });
              }
            }

            if(temp.isStudent){//student가 아닌 경우는 위에서 처리 완료 else 안해도 됨
              const salt = crypto.randomBytes(64).toString('base64');
              const hashPassword = crypto.createHash('sha512').update(post.email + salt).digest('hex');
              var query1 = mysql.format('INSERT INTO `dbraipen`.`applicant` (`student_id`, `phone_number`, `email`, `salt`, `token`) VALUES (?, ?, ?, ?, ?);',[post.number,post.phone_number,post.email,salt,hashPassword]);
              var query2 = mysql.format('INSERT INTO `dbraipen`.`apply_info` (`student_id`, `dues`, `verify`, `first_floor`, `first_height`, `second_floor`, `second_height`) VALUES (?, ?, ?, ?, ?, ?, ?)',[post.number,0,0,post.first_floor,post.first_height,post.second_floor,post.second_height]);
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
                      sendMail(post.email,post.number,hashPassword);
                      response.writeHead(200);
                      response.end(JSON.stringify(temp));
                    }
                  });
            }

          });//select 쿼리 끝
      });
  }
}
