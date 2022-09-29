const router = require('express').Router();
const fs = require('fs');
const AllocateLocker = require('../jobs/AllocateLocker');

router.get('/', async (req, res) => {
    console.log("test");
    fs.readFile('./src/global/test.html', 'utf-8', (error, data) => {
        res.send(data);
    });
});

router.get('/allocate', async (req, res) => {
    console.log("test/allocate");
    const result = await AllocateLocker.sendAllocate();
    res.json(result);
});

module.exports = router;