var fs = require('fs');
var url = require('url');
var qs = require('querystring');
const nodemailer = require('nodemailer');
const properties = require('/web/properties.js');
const crypto = require('crypto');

async function sendMail() {
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
        to: '',//여기에 테스트로 받을 이메일 넣어봐
        subject: '테스트 메일제목입니다.',
        text:
        `
        안녕하세요.
        오늘 날짜는 ${new Date()} 입니다.
        좋은 하루 보내세요.
        `,  //텍스트로 보냅니다.
        //html:'<div>HTML형식으로 보낼 때 사용됩니다.</div>'
    })

    //#4. 전송 후 결과 단순 출력
    for(let key in info){
        console.log('키 : '+key + ', 값 : ' + info[key])
    }
}

module.exports ={
  main:function(request,response){

    const salt = crypto.randomBytes(64).toString('base64');
    const hashPassword = crypto.createHash('sha512').update("raipen@knu.ac.kr" + salt).digest('hex');
    console.log(salt);
    console.log(crypto.createHash('sha512').update("raipen@knu.ac.kr" + salt).digest('base64'));
    console.log(hashPassword);
    //sendMail();
    response.writeHead(302, {'Location': '/apply/'});
    response.end();
  }
}
