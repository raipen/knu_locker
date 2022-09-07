const sequelize = require('../db');
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