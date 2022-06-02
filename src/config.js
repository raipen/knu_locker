const dotenv = require('dotenv');

dotenv.config();

const config = {
    PORT: process.env.PORT,
    DBaddress: process.env.DBaddress,
    DBuser: process.env.DBuser,
    DBpassword: process.env.DBpassword,
    DBdatabase: process.env.DBdatabase,
    DBport: process.env.DBport
}

module.exports = config;