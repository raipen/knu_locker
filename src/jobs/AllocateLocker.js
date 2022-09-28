const db = require('../models');

//신청자 정보와 사물함 정보를 받아와서 사물함을 할당하는 클래스
class AllocateLocker{
    floor = [-1,1,3];
    height = [[1,2,3,4,5],[1,2,3,4],[1,2,3,4]];

    //인자로 층수와 높이를 받아 1지망 먼저 배정하고 2지망 먼저 배정해주는 함수
    async allocate(floor, height){
        const first = await this.getFirstChoice(floor, height);
        const second = await this.getSecondChoice(floor, height);
        const locker = await this.getAvailableLocker(floor, height);
        return locker;
    }

    //인자로 층수와 높이를 받아 해당 층수와 높이인 사물함 중 할당되지 않은 사물함만 리턴하는 함수
    async getAvailableLocker(floor, height){
        const locker = await db.Locker.findAll({
            where: {
                floor: floor,
                height: height,
            },
            include:[{
                model: db.Allocate,
                where: {
                    student_id:"2021114335"
                },
                attributes: ['student_id'],
            }]
        });
        return locker;
    }

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
        console.log(apply[0].student_id);
        return apply;
    };

    //인자로 층수와 높이를 받아 해당 층수와 높이를 2지망으로 원하는 사람 리턴하는 함수
    async getSecondChoice(floor, height){
        const apply = await db.Apply.findAll({
            where: {
                second_floor: floor,
                second_height: height,
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