const sequelize = require('../db');
const crypto = require('crypto');
const studentModel = require('../models/Student');
const applyModel = require('../models/Apply');
const applicantModel = require('../models/Applicant');
const {sendSMS} = require('../jobs/SMS');

class UserService {
    async checkDues(userDTO){
        let result = await studentModel.findOne({
            where: {
                name:userDTO.name,
                student_id: userDTO.number
            }
        });
        if(result)
            return {success: true, isStudent: true, dues:result.dues===1}
        else
            return {success: true, isStudent: false}
    }

    async sendCertificationCode(userDTO){
        //use crypto 6 digit random number
        let code = crypto.randomInt(100000, 999999);
        if(userDTO.phone===undefined)
            throw new Error("Phone number is not provided");
        let SMSresult = await sendSMS(
            userDTO.phone,
            "SMS",
            `[KNU CSE] 인증번호 [${code}]를 입력해주세요.`
        );
        //전화번호 전송 실패시 오류 던지기
        if(SMSresult.statusName!=="success")
            throw new Error("SMS sending failed");
        return code;
    }

    async generateCertificationCookie(userDTO,code){
        let cookieValue = JSON.stringify({code:code,phone:userDTO.phone,timestamp:Date.now()});
        console.log(cookieValue);
        return {code: cookieValue,key:"vc"};
    }

    async checkCertificationCode(userDTO,cookies){
        let cookie = cookies["vc"];
        if(cookie===undefined)
            return false;
        let cookieValue = JSON.parse(cookie);
        //코드 일치, 전화번호 일치, 5분 이내
        console.log(cookieValue.code,userDTO.code);
        if(cookieValue.code===Number(userDTO.code) && cookieValue.phone===userDTO.phone && Date.now()-cookieValue.timestamp<300000)
            return true;
        else
            return false;
    }

    async generateVerifiedPhoneCookie(userDTO){
        let cookieValue = JSON.stringify({phone:userDTO.phone,timestamp:Date.now()});
        return {code: cookieValue,key:"vp"};
    }

    async fetchApply(userDTO){
        let lockerInfo = await sequelize.query(
            "SELECT locker_info.* FROM assigned_locker "+
            "join locker_info on assigned_locker.locker = locker_info.locker "+
            "join student_list as s on assigned_locker.student_id = s.student_id "+
            "where s.name=? and s.student_id=?;",
            { 
                type: sequelize.QueryTypes.SELECT,
                replacements: [userDTO.name,userDTO.number]
            }
        );
        if(lockerInfo.length === 0)
            throw new Error("No results found");
        let applicantInfo = await applicantModel.findOne({
                where: {
                    student_id: userDTO.number
                }
            });
        console.log(applicantInfo.phone_number);
        console.log(lockerInfo[0].locker+" "+lockerInfo[0].pw);
        let SMSresult = await sendSMS(
            applicantInfo.phone_number,
            "SMS",
            `이름: ${userDTO.name}\n사물함: ${lockerInfo[0].locker}\n초기 비밀번호: ${lockerInfo[0].pw}`
        );
        console.log(SMSresult);
        return {success: SMSresult.statusName==="success",phone: applicantInfo.phone_number};
    }


}

module.exports = new UserService();