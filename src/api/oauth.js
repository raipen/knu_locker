const express = require('express');
const router = express.Router();
const {errorCatcher,errorHandling} = require('./asyncErrorWraper');
const OauthService = require('../services/OauthService');
const logger = require('../log');

router.get('/', errorCatcher(async (req, res) => {
    const DTO = req.query;
    console.log(`[/oauth] ${DTO.code} ${DTO.error}`);
    logger(req,"[/oauth]",{code:DTO.code,error:DTO.error});
    const {access_token,refresh_token} = await OauthService.getOauthToken(DTO);
    //refresh_token은 cookie에 저장하고 access_token은 클라이언트에게 전달한다.
    res.cookie('refresh_token',refresh_token,{httpOnly:true});
    res.cookie('access_token',access_token,{httpOnly:true});
    res.redirect('/agree');
}));

module.exports = router;
