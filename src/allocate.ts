import config from './config';
import db_loader from "./loaders/db";
import AllocateLocker from './jobs/AllocateLocker';

const allocate = async () => {
    await db_loader();
    let result = await AllocateLocker();
    console.log("-------------------- 배정결과 --------------------");
    result.forEach((result,i) => {
        console.log(i, JSON.stringify(result));
    });
    process.exit();
};

allocate();
