import { Students, Applied, Allocated, Lockers } from '../models';
import { StudentModel } from '../models/Student';
import { ApplyModel } from '../models/Apply';
import { AllocateModel } from '../models/Allocate';
import { LockerModel } from '../models/Locker';
import logger from '../log';

declare global {
    interface Array<T> {
        asyncForEach(callback: (value: T, index: number, array: T[]) => Promise<any>): Promise<void>;
    }
}

Array.prototype.asyncForEach = async function (callback) {
    for (let index = 0; index < this.length; index++) {
        await callback(this[index], index, this);
    }
}

const floor = [-1, 1, 3];
const height = [[1, 2, 3, 4, 5], [1, 2, 3, 4], [1, 2, 3, 4]]; //남은 자리 중에서 찾을때 밑에서부터 찾게 함

const allocate = async () => {
    await [allocateFirst, allocateSecond].asyncForEach(async (func) =>
        await floor.asyncForEach(async (floor,index) =>
            await height[index].asyncForEach(async (height) => await func(floor, height))
        )
    );

    await allocateLeft();
    return await Allocated.findAll({
        include: [{
            model: Applied,
            attributes: ['phone'],
        }, {
            model: Lockers,
            attributes: ['pw'],
        }]
    });
}

const allocateFirst = async (floor: number, height: number) => {
    const apply = await getFirstChoice(floor, height);
    const locker = await getAvailableLocker(floor, height);

    const duesApply = apply.filter((apply) => apply.student_list.dues === 1);
    const notDuesApply = apply.filter((apply) => apply.student_list.dues === 0);
    shuffle(duesApply);
    shuffle(notDuesApply);
    const shuffledApply = duesApply.concat(notDuesApply);
    let i = 0;
    for (; i < shuffledApply.length && i < locker.length; i++)
        await allocateLocker(shuffledApply[i], locker[i]);
}

const allocateSecond = async (floor: number, height: number) => {
    const apply = await getAvailableSecondChoice(floor, height);
    const locker = await getAvailableLocker(floor, height);

    const duesApply = apply.filter((apply) => apply.student_list.dues === 1);
    const notDuesApply = apply.filter((apply) => apply.student_list.dues === 0);
    shuffle(duesApply);
    shuffle(notDuesApply);
    const shuffledApply = duesApply.concat(notDuesApply);
    let i = 0;
    for (; i < shuffledApply.length && i < locker.length; i++)
        await allocateLocker(shuffledApply[i], locker[i]);
}

const allocateLeft = async () => {
    const apply = await getAvailableApply();
    for (let a = 0; a < apply.length; a++) {
        //1지망과 같은 층수 중에서 할당되지 않은 사물함을 찾는다.
        await findAndAllocate(apply[a]);
    }
}

const findAndAllocate = async (apply:ApplyModel) => {
    let floor = Array.from(new Set([apply.first_floor, apply.second_floor, -1, 1, 3]));
    let height = [];
    for (let i = 0; i < floor.length; i++) {
        if (floor[i] === -1)
            height.push([5, 4, 3, 2, 1]);
        else
            height.push([4, 3, 2, 1]);
    }
    for (let i in floor) {
        for (let j in height[i]) {
            const locker = await getAvailableLocker(floor[i], height[i][j]);
            if (locker.length === 0)
                continue;
            return await allocateLocker(apply, locker[0]);
        }
    }
}

const allocateLocker = async (apply:ApplyModel, locker:LockerModel) => {
    logger(null, "[allocateLocker]", { student: apply, locker: locker });
    await Allocated.create({
        student_id: apply.student_id,
        locker: locker.locker,
    });
}


//인자로 층수와 높이를 받아 해당 층수와 높이인 사물함 중 할당되지 않은 사물함만 리턴하는 함수
const getAvailableLocker = async (floor: number, height: number) => {
    const locker = await Lockers.findAll({
        where: {
            floor: floor,
            height: height,
        },
        include: [{
            model: Allocated,
            as: 'allocate',
            attributes: ['locker'],
        }]
    }) as unknown as (LockerModel & { allocate: AllocateModel })[];
    return locker.filter((locker) => locker.allocate === null);
}

//인자로 층수와 높이를 받아 해당 층수와 높이를 1지망으로 원하는 사람 리턴하는 함수
const getFirstChoice = async (floor: number, height: number) => {
    const apply = await Applied.findAll({
        where: {
            first_floor: floor,
            first_height: height,
        },
        include: [{
            model: Students,
            attributes: ['name', 'student_id', 'dues'],
        }, {
            model: Allocated,
            as: 'allocate',
            attributes: ['student_id'],
        }]
    }) as unknown as (ApplyModel & { student_list: StudentModel } & { allocate: AllocateModel })[];
    //console.log(apply[0].student_id);
    return apply.filter((apply) => apply.allocate === null);
};

//인자로 층수와 높이를 받아 해당 층수와 높이를 2지망으로 원하는 사람 리턴하는 함수
const getAvailableSecondChoice = async (floor: number, height: number) => {
    const apply = await Applied.findAll({
        where: {
            second_floor: floor,
            second_height: height,
        },
        include: [{
            model: Students,
            attributes: ['name', 'student_id', 'dues'],
        }, {
            model: Allocated,
            as: 'allocate',
            attributes: ['student_id'],
        }]
    }) as unknown as (ApplyModel & { student_list: StudentModel } & { allocate: AllocateModel })[];
    return apply.filter((apply) => apply.allocate === null);
};

const getAvailableApply = async () => {
    const apply = await Applied.findAll({
        include: [{
            model: Students,
            attributes: ['name', 'student_id', 'dues'],
        }, {
            model: Allocated,
            as: 'allocate',
            attributes: ['student_id'],
        }]
    }) as unknown as (ApplyModel & { student_list: StudentModel } & { allocate: AllocateModel })[];
    return apply.filter((apply) => apply.allocate === null);
}

const shuffle =<T extends Array<any>> (array: T) => {
    for (let index = array.length - 1; index > 0; index--) {
        const randomPosition = Math.floor(Math.random() * (index + 1));
        [array[index], array[randomPosition]] = [array[randomPosition], array[index]];
    }
}

export default allocate;
