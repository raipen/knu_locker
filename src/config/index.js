const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.PORT);
console.log(process.env.NODE_ENV);
const config = {
  PORT: process.env.PORT,
  DB: {
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
  },
  KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI || `http://localhost:${process.env.PORT}/oauth`,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  KAKAOID: process.env.KAKAOID,
  START_DATE: process.env.START_DATE,
  DEAD_LINE: process.env.DEAD_LINE,
  SEMESTER: process.env.SEMESTER,
  LAST_SEMESTER: process.env.LAST_SEMESTER,
  NODE_ENV: process.env.NODE_ENV
}

module.exports = config;
