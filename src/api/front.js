const router = require('express').Router();
const fs = require('fs');

router.get('/', async (req, res) => {
    console.log(`[/]`);
    fs.readFile('./src/global/index.html', 'utf-8', (error, data) => {
        res.send(data);
    });
});

router.get('/search', async (req, res) => {
    console.log(`[/search]`);
    fs.readFile('./src/global/search.html', 'utf-8', (error, data) => {
        res.status(200).send(data);
    });
});

router.use(async (req, res) => {
    allowPage=["/logo.png"];
    if(!allowPage.includes(req.url))
        return res.status(404).json({message: "not found"});
    console.log(req.url);
    fs.readFile('./src/global'+req.url, (error, data) => {
        res.send(data);
    });
});

module.exports = router;