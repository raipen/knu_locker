const dotenv = require('dotenv');

dotenv.config();

const config = {
    PORT: process.env.PORT,
    DB:{
        "development": {
          "username": process.env.testDBuser,
          "password": process.env.testDBpassword,
          "database": process.env.DBdatabase,
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
    DBuser: process.env.DBuser,
    DBpassword: process.env.DBpassword,
    DBdatabase: process.env.DBdatabase,
    DBaddress: process.env.DBaddress,
    DBport: process.env.DBport
}

module.exports = config;