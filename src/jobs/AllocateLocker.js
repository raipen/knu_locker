const db = require('../models');
const logger = require('../log');
const {sendSMS} = require('../jobs/SMS');
//신청자 정보와 사물함 정보를 받아와서 사물함을 할당하는 클래스
class AllocateLocker{
    floor = [-1,1,3];
    height = [[1,2,3,4,5],[1,2,3,4],[1,2,3,4]]; //남은 자리 중에서 찾을때 밑에서부터 찾게 함

    async sendAllocate(){
        const allocate = await db.Allocate.findAll({
            include: [{
                model: db.Apply,
                attributes: ['phone'],
            },{
                model: db.Locker,
                attributes: ['pw'],
            }]
        });
        for(let i = 0; i < allocate.length ; i++){
            const message = `[KNU CSE] 사물함 배정 완료\n사물함: ${allocate[i].locker}\n비밀번호: ${allocate[i].locker_info.pw}`;
            console.log(message);
            let SMSresult = await sendSMS(allocate[i]['apply_'+process.env.SEMESTER].phone,"SMS", message);
            logger(null,"[sendAllocate]", SMSresult);
        } 
        return allocate;
    }

    async allocate(){
        for(let i = 0; i < this.floor.length; i++)
            for(let j = 0; j < this.height[i].length; j++)
                await this.allocateFirst(this.floor[i], this.height[i][j]);

        for(let i = 0; i < this.floor.length; i++)
            for(let j = 0; j < this.height[i].length; j++)
                await this.allocateSecond(this.floor[i], this.height[i][j]);

        await this.allocateLeft();
        return await db.Allocate.findAll({
            include: [{
                model: db.Apply,
                attributes: ['phone'],
            },{
                model: db.Locker,
                attributes: ['pw'],
            }]
        });
    }

    async allocateFirst(floor, height){
        const apply = await this.getFirstChoice(floor, height);
        const locker = await this.getAvailableLocker(floor, height);

        const duesApply = apply.filter((apply) => apply.student_list.dues == 1);
        const notDuesApply = apply.filter((apply) => apply.student_list.dues == 0);
        this.shuffle(duesApply);
        this.shuffle(notDuesApply);
        const shuffledApply = duesApply.concat(notDuesApply);
        let i = 0;
        for(; i < shuffledApply.length && i<locker.length; i++)
            await this.allocateLocker(shuffledApply[i], locker[i]);
    }

    async allocateSecond(floor, height){
        const apply = await this.getAvailableSecondChoice(floor, height);
        const locker = await this.getAvailableLocker(floor, height);

        const duesApply = apply.filter((apply) => apply.student_list.dues == 1);
        const notDuesApply = apply.filter((apply) => apply.student_list.dues == 0);
        this.shuffle(duesApply);
        this.shuffle(notDuesApply);
        const shuffledApply = duesApply.concat(notDuesApply);
        let i = 0;
        for(; i < shuffledApply.length && i<locker.length; i++)
            await this.allocateLocker(shuffledApply[i], locker[i]);
    }

    async allocateLeft(){
        const apply = await this.getAvailableApply();
        for(let a=0;a<apply.length;a++){
            //1지망과 같은 층수 중에서 할당되지 않은 사물함을 찾는다.
            await this.findAndAllocate(apply[a]);
        }
    }

    async findAndAllocate(apply){
        let floor = Array.from(new Set([apply.first_floor,apply.second_floor,-1,1,3]));
        let height = [];
        for (let i = 0; i < floor.length; i++) {
            if (floor[i] === -1)
                height.push([5, 4, 3, 2, 1]);
            else
                height.push([4, 3, 2, 1]);
        }
        for (let i in floor) {
            for (let j in height[i]) {
                const locker = await this.getAvailableLocker(floor[i], height[i][j]);
                if (locker.length == 0)
                    continue;
                return await this.allocateLocker(apply, locker[0]);
            }
        }
    }

    async allocateLocker(apply, locker){
        logger(null,"[allocateLocker]", {student: apply,locker:locker});
        await db.Allocate.create({
            student_id: apply.student_id,
            locker: locker.locker
        });
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
                as: 'allocate',
                attributes: ['locker'],
            }]
        });
        return locker.filter((locker) => locker.allocate == null);
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
            },{
                model: db.Allocate,
                as: 'allocate',
                attributes: ['student_id'],
            }]
        });
        //console.log(apply[0].student_id);
        return apply.filter((apply) => apply.allocate == null);
    };

    //인자로 층수와 높이를 받아 해당 층수와 높이를 2지망으로 원하는 사람 리턴하는 함수
    async getAvailableSecondChoice(floor, height){
        const apply = await db.Apply.findAll({
            where: {
                second_floor: floor,
                second_height: height,
            },
            include: [{
                model: db.Student,
                attributes: ['name', 'student_id','dues'],
            },{
                model: db.Allocate,
                as: 'allocate',
                attributes: ['student_id'],
            }]
        });
        return apply.filter((apply) => apply.allocate == null);
    };

    async getAvailableApply(){
        const apply = await db.Apply.findAll({
            include: [{
                model: db.Student,
                attributes: ['name', 'student_id','dues'],
            },{
                model: db.Allocate,
                as: 'allocate',
                attributes: ['student_id'],
            }]
        });
        return apply.filter((apply) => apply.allocate == null);
    }

    shuffle(array) {
        for (let index = array.length - 1; index > 0; index--) {
          const randomPosition = Math.floor(Math.random() * (index + 1));
          [array[index],array[randomPosition]] = [array[randomPosition],array[index]];
        }
    }

}

module.exports = new AllocateLocker();