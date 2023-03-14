console.log(process.env.NODE_ENV);
const config = require('./config');
const db_loader = require("./loaders/db");
const AllocateLocker = require('./jobs/AllocateLocker');

const allocate = async () => {
    await db_loader(null);
    let result = await AllocateLocker.allocate();
    console.log("-------------------- 배정결과 --------------------");
    result.forEach((result,i) => {
        console.log(i, JSON.stringify(result));
    });
    process.exit();
};

allocate();