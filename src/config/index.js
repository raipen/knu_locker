const dotenv = require('dotenv');

dotenv.config();

const config = {
    PORT: process.env.PORT,
    DB:{
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
    SMS:{
      NCP_SENS_ACCESS: process.env.NCP_SENS_ACCESS,
      NCP_SENS_SECRET: process.env.NCP_SENS_SECRET,
      NCP_SENS_ID: process.env.NCP_SENS_ID,
      NCP_SENS_MY_NUMBER: process.env.NCP_SENS_MY_NUMBER
    },
    COOKIE_SECRET: process.env.COOKIE_SECRET
}

module.exports = config;