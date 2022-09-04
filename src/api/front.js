const router = require('express').Router();
const fs = require('fs');

router.get('/', async (req, res) => {
    console.log(`[/]`);
    fs.readFile('./src/global/index.html', 'utf-8', (error, data) => {
        res.send(data);
    });
});

router.get('/logo.png', async (req, res) => {
    console.log(`[/logo.png]`);
    fs.readFile('./src/global/logo.png', (error, data) => {
        res.send(data);
    });
});

module.exports = router;