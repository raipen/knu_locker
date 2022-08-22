const { DBaddress, DBuser, DBpassword, DBdatabase, DBport} = require('../../config');
const mysql = require('mysql');

async function connect(){
    var connection = mysql.createConnection({
        host     : DBaddress,
        port     : DBport,
        user     : DBuser,
        password : DBpassword,
        database : DBdatabase,
        multipleStatements:true
    });
    return connection;
}

module.exports = {
    connection: connect
};