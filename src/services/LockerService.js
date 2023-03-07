const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const db = require('../models');
const {sendSMS} = require('../jobs/SMS');
const {COOKIE_SECRET} = require('../config');

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
        let now = new Date();
        let deadline = new Date(process.env.DEAD_LINE);
        if (now > deadline) {
            throw new Error("Application deadline has passed");
        }
        
        let phone = cookies["phone"];
        if(phone===undefined||!(/^010\d{8}$/.test(phone)))
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
        return false;
    }

    async fetchApply(userDTO){
        let isStudent = await this.isStudent(userDTO);
        if(!isStudent)
            throw new Error("Student is not found");
        const allocate = await db.Allocate.findOne({
            where: {
                student_id: userDTO.studentId
            },
            include: [{
                model: db.Apply,
                attributes: ['phone'],
            },{
                model: db.Locker,
                attributes: ['pw'],
            }]
        });
        let phone = allocate['apply_'+process.env.SEMESTER].phone.replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`);
        console.log(phone);
        let SMSresult = await sendSMS(
            allocate['apply_'+process.env.SEMESTER].phone,
            "SMS",
            `이름: ${userDTO.name}\n사물함: ${allocate.locker}\n비밀번호: ${allocate.locker_info.pw}`
        );
        console.log(SMSresult);
        return {success: SMSresult.statusName==="success",phone: phone.substr(0,6)+"**"+phone.substr(8,3)+"**"};
    }

    async fetchLastApply(userDTO){
        let isStudent = await this.isStudent(userDTO);
        if(!isStudent)
            throw new Error("Student is not found");
        const allocate = await db.LastAllocate.findOne({
            where: {
                student_id: userDTO.studentId
            },
            include: [{
                model: db.LastApply,
                attributes: ['phone'],
            },{
                model: db.Locker,
                attributes: ['pw'],
            }]
        });
        let phone = allocate['apply_'+process.env.LAST_SEMESTER].phone.replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`);
        console.log(phone);
        let SMSresult = await sendSMS(
            allocate['apply_'+process.env.LAST_SEMESTER].phone,
            "SMS",
            `이름: ${userDTO.name}\n사물함: ${allocate.locker}\n비밀번호: ${allocate.locker_info.pw}`
        );
        console.log(SMSresult);
        return {success: SMSresult.statusName==="success",phone: phone.substr(0,6)+"**"+phone.substr(8,3)+"**"};
    }

    async status(){
        let deadline = new Date(process.env.DEAD_LINE);
        let nextDayOfDeadline = new Date(deadline.getTime() + 24 * 60 * 60 * 1000);
        
        return [{
            isDisabled: new Date() > deadline || new Date() < new Date(process.env.START_DATE),
            date: process.env.START_DATE + "~" + process.env.DEAD_LINE,
        },
        {
            isDisabled: new Date() > new Date(process.env.CLEAN_DEAD_LINE),
            date: "~"+process.env.CLEAN_DEAD_LINE,
        },
        {
            isDisabled: new Date() < nextDayOfDeadline,
            date: nextDayOfDeadline.toISOString().substring(0,19).replace('T',' ')+"~",
        }];
    }

}

module.exports = new UserService();