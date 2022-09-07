var fs = require('fs');
var requestIp = require('request-ip');

module.exports = function (request,api,data){
    let time = new Date().toLocaleString('ko-KR',{dateStyle:"medium",timeStyle:"short", hour12: false });
    let ip = requestIp.getClientIp(request);
    let dataString = "";
    for( key in data){
        dataString += key + "=" + data[key] + "|";
    }
    fs.appendFileSync(
        __dirname+'/log.csv',
        `${time},${ip},${api},${dataString}${"\n"}`,
        'utf8');
}