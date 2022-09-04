const crypto = require('crypto');
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
}

module.exports = new UserService();