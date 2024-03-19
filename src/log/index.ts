import requestIp from 'request-ip';
import { Request } from 'express';
import fs from 'fs';

export default function (request:Request|null = null,api: string,data:any){
    let time = new Date().toLocaleString('ko-KR',{dateStyle:"medium",timeStyle:"short", hour12: false });
    let ip = request===null?"Schedule": requestIp.getClientIp(request);
    let dataString = data ? JSON.stringify(data).replaceAll(",","|") : "";
    fs.appendFileSync(
        __dirname+'/log.csv',
        `${time},${ip},${api},${dataString}${"\n"}`,
        'utf8');
}
