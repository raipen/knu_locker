const db = require('../models');
const qs = require('qs');
const axios = require('axios');
const {KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI} = require('../config');
class OauthService {
    async getOauthToken({code,error}){
        if(error)
            throw new Error(error);
        const {data} = await axios({
            method: 'post',
            url: 'https://kauth.kakao.com/oauth/token',
            data: qs.stringify({
            grant_type: 'authorization_code',
            client_id: KAKAO_CLIENT_ID,
            redirect_uri: KAKAO_REDIRECT_URI,
            code
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        });
        return data;
    }
}

module.exports = new OauthService();
