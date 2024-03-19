const CryptoJS = require('crypto-js');
const { SMS } = require('../config');
const axios = require('axios');

class NCPSMS{
    /**
     * @param {string} phoneNumber 하이픈 포함 전화번호
     * @param {string} type ("SMS"|"LMS") SMS: 건당 9원, LMS: 건당 30원
     * @param {string} message 전송할 메시지(SMS:80byte, LMS:2000byte)
     * @returns axios 결과
     */
    async sendSMS(phoneNumber,type,message){
        const user_phone_number = phoneNumber.split("-").join("");
        const date = Date.now().toString();

        const uri = SMS.NCP_SENS_ID;
        const secretKey = SMS.NCP_SENS_SECRET;
        const accessKey = SMS.NCP_SENS_ACCESS;
        const my_number = SMS.NCP_SENS_MY_NUMBER;
        const method = 'POST';
        const space = " ";
        const newLine = "\n";
        const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
        const url2 = `/sms/v2/services/${uri}/messages`;

        const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
        hmac.update(method);
        hmac.update(space);
        hmac.update(url2);
        hmac.update(newLine);
        hmac.update(date);
        hmac.update(newLine);
        hmac.update(accessKey);
        const hash = hmac.finalize();
        const signature = hash.toString(CryptoJS.enc.Base64);

        const smsRes = await axios({
            method: method,
            url: url,
            headers: {
              "Contenc-type": "application/json; charset=utf-8",
              "x-ncp-iam-access-key": accessKey,
              "x-ncp-apigw-timestamp": date,
              "x-ncp-apigw-signature-v2": signature,
            },
            data: {
              type: type,
              countryCode: "82",
              from: my_number,
              content: message,
              messages: [{ to: `${user_phone_number}` }],
            },
          });
          return smsRes.data;
    }

}

module.exports = new NCPSMS();
