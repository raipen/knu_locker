import qs from 'qs';
import axios from 'axios';
import config from '../config';

export const getOauthToken = async ({code,error}:{code:string,error:string}) => {
    if(error)
        throw new Error(error);
    const {data} = await axios({
        method: 'post',
        url: 'https://kauth.kakao.com/oauth/token',
        data: qs.stringify({
            grant_type: 'authorization_code',
            client_id: config.KAKAO_CLIENT_ID,
            redirect_uri: config.KAKAO_REDIRECT_URI,
            code
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    });
    return data;
}
