const db = require('../models');

//신청자 정보와 사물함 정보를 받아와서 사물함을 할당하는 클래스
class AllocateLocker{
    //인자로 층수와 높이를 받아 해당 층수와 높이를 1지망으로 원하는 사람 리턴하는 함수
    async getFirstChoice(floor, height){
        const apply = await db.Apply.findAll({
            where: {
                first_floor: floor,
                first_height: height,
            },
            include: [{
                model: db.Student,
                attributes: ['name', 'student_id','dues'],
            }]
        });
        return apply;
    };

}

module.exports = new AllocateLocker();