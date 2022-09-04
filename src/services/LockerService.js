const crypto = require('crypto');
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const studentModel = require('../models/Student');

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
        let result = await studentModel.query(`SELECT * FROM dbraipen.assigned_locker join dbraipen.locker_info on assigned_locker.locker = locker_info.locker;`);
        console.log(result);
        return {success: true};
    }
}

module.exports = new UserService();