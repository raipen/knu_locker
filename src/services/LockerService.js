const crypto = require('crypto');

class UserService {
    async SignUp(userDTO){
        //throw new Error("asdf");
        return{name: userDTO.name, number: userDTO.number};
    }
}

module.exports = new UserService();