import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.PORT);
console.log(process.env.NODE_ENV);
const NODE_ENV= (process.env.NODE_ENV || 'development') as 'development' | 'production';
const DB = {
  "development": {
    "username": process.env.testDBuser,
    "password": process.env.testDBpassword,
    "database": process.env.testDBdatabase,
    "host": process.env.testDBaddress,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DBuser,
    "password": process.env.DBpassword,
    "database": process.env.DBdatabase,
    "host": process.env.DBaddress,
    "dialect": "mysql"
  }
};
const ENV_DB = DB[NODE_ENV];
if(!ENV_DB)
  throw new Error('DB 설정이 없습니다.');
if(Object.values(ENV_DB).some((v)=>!v))
  throw new Error('DB 설정이 잘못되었습니다.');

const config = {
  PORT: process.env.PORT,
  DB: ENV_DB,
  KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI || `http://localhost:${process.env.PORT}/oauth`,
  START_DATE: process.env.START_DATE,
  DEAD_LINE: process.env.DEAD_LINE,
  SEMESTER: process.env.SEMESTER,
  LAST_SEMESTER: process.env.LAST_SEMESTER,
  KAKAOID: process.env.KAKAOID,
  NODE_ENV
}

if(Object.values(config).some((v)=>!v))
  throw new Error('환경변수 설정이 잘못되었습니다.');

export default config as Record<
  "PORT" | "KAKAO_CLIENT_ID" | "KAKAO_REDIRECT_URI" | "START_DATE" | "DEAD_LINE" | "SEMESTER" | "LAST_SEMESTER" | "KAKAOID" | "NODE_ENV",
  string>
& {DB: Record<"username" | "password" | "database" | "host" , string>&{dialect: "mysql"}};
