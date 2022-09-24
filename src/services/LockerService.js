const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const db = require('../models');
const {sendSMS} = require('../jobs/SMS');
const {COOKIE_SECRET} = require('../config');
const e = require('express');


class UserService {
    async checkDues(userDTO){
        let result = await db.Student.findOne({
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
        let code = crypto.randomInt(100000, 999999);
        if(userDTO.phone===undefined)
            throw new Error("Phone number is not provided");
        let SMSresult = await sendSMS(
            userDTO.phone,
            "SMS",
            `[KNU CSE] 인증번호 [${code}]를 입력해주세요.`
        );
        if(SMSresult.statusName!=="success")
            throw new Error("SMS sending failed");
        return code;
    }

    async generateCertificationCookie(userDTO,code){
        let cookieValue = CryptoJS.AES.encrypt(
            JSON.stringify({ code: code, phone: userDTO.phone, timestamp: Date.now() }), COOKIE_SECRET
        ).toString();
        return {key:"vc",value: cookieValue};
    }

    async checkCertificationCode(userDTO,cookies){
        let cookie = cookies["vc"];
        if(cookie===undefined)
            return false;
        let cookieValue = JSON.parse(CryptoJS.AES.decrypt(cookie, COOKIE_SECRET).toString(CryptoJS.enc.Utf8));
        if(cookieValue.code===Number(userDTO.code) && cookieValue.phone===userDTO.phone && Date.now()-cookieValue.timestamp<300000)
            return true;
        else
            return false;
    }

    async generateVerifiedPhoneCookie(userDTO){
        return {key:"phone",value: userDTO.phone};
    }

    async checkStudent(userDTO){
        let result = await db.Student.findOne({
            where: {
                name:userDTO.name,
                student_id: userDTO.studentId
            }
        });
        if(result){
            console.log(result);
            return {isStudent: true};
        }
        
        result = await db.Student.findOne({
            where: {
                name:userDTO.name,
                student_id: null
            }
        });
        let update;
        if(result)
            update = await db.Student.update({student_id: userDTO.studentId}, {where: {name: userDTO.name,student_id: null}});
        else
            throw new Error("No results found");
        
        if(update)
            return {isStudent: true};
        else
            throw new Error("Update failed");
    }

    async apply(userDTO, cookies){
        let phone = cookies["phone"];
        if(phone===undefined)
            throw new Error( "Phone number is not verified");
        
        // Check if the student is already applied
        let isStudent = await this.isStudent(userDTO);
        if(!isStudent)
            throw new Error("Student is not found");
        let isAppledStudent = await this.isAppledStudent(userDTO);
        if(isAppledStudent)
            throw new Error("Already applied student");
        let isAppledPhone = await this.isAppledPhone(phone);
        if(isAppledPhone)
            throw new Error("Already applied phone number");

        let result = await db.Apply.create({
            student_id: userDTO.studentId,
            phone: phone,
            first_floor: userDTO.first_floor,
            first_height: userDTO.first_height,
            second_floor: userDTO.second_floor,
            second_height: userDTO.second_height,
        });
        console.log(result);
        return {success: true};
    }

    async isStudent(userDTO){
        let result = await db.Student.findOne({
            where: {
                name:userDTO.name,
                student_id: userDTO.studentId
            }
        });
        if(result)
            return true;
        else
            return false;
    }

    async isAppledStudent(userDTO){
        let result = await db.Apply.findOne({
            where: {
                student_id: userDTO.studentId
            }
        });
        if(result)
            return true;
        else
            return false;
    }

    async isAppledPhone(phone){
        let result = await db.Apply.findOne({
            where: {
                phone: phone
            }
        });
        if(result)
            return true;
        else
            return false;
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