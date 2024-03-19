const config = require('./config');
const db_loader = require("./loaders/db");
const AllocateLocker = require('./jobs/AllocateLocker');

const allocate = async () => {
    await db_loader(null);
    let result = await AllocateLocker.sendAllocate();
    process.exit();
};

allocate();
