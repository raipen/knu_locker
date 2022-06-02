const { DBaddress, DBuser, DBpassword, DBdatabase, DBport} = require('../../config');
const mysql = require('mysql');

module.exports = {
    connection: mysql.createConnection({
        host     : DBaddress,
        port     : DBport,
        user     : DBuser,
        password : DBpassword,
        database : DBdatabase,
        multipleStatements:true
    }),
};