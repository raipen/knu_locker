const router = require('express').Router();
const fs = require('fs');
const axios = require('axios');
const logger = require('../log');

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

router.post('/fetchApply', async (req, res) => {
    console.log(`[/fetchApply]`);
    logger(req,"[/fetchApply]",req.body);
    try{
        const result = await axios.post(
            "http://localhost:8080/API/fetchApply",
            {
                name:req.body.name,
                number:req.body.number
            }
            )
        if(result.data.success){
            let phone = result.data.phone;
            let securePhone = phone.substr(0,6)+"**"+phone.substr(8,3)+"**";
            res.redirect("/Result?phone="+securePhone);
        }else{
            res.redirect("/NoResult");
        }
    }catch(err){
        res.redirect("/NoResult");
    }
      
});

router.get('/Result', async (req, res) => {
    console.log(`[/Result]`);
    fs.readFile('./src/global/Result.html', 'utf-8', (error, data) => {
        res.status(200).send(data+`${req.query.phone}에서 문자를 확인해주세요.</h1><br>
        </article>
        <footer>
            <p class="col-12 tm-copyright-text mb-0">
                Copyright 2022. KNU CSE student. 
                <br>
                <a href="https://www.instagram.com/ji1_bahk/" rel="nofollow" class="tm-copyright-link">@ji1_bahk</a>,
                <a href="https://www.instagram.com/wlssyuu/" rel="nofollow" class="tm-copyright-link">designed by @wlssyuu</a>
            </p>
        </footer>
    </body>
    </html>`);
    });
});

router.get('/NoResult', async (req, res) => {
    console.log(`[/NoResult]`);
    fs.readFile('./src/global/NoResult.html', 'utf-8', (error, data) => {
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