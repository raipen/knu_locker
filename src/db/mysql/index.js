const { DBaddress, DBuser, DBpassword, DBdatabase, DBport} = require('../../config');
const mysql = require('mysql');

const DBinfo = {
    host     : DBaddress,
    port     : DBport,
    user     : DBuser,
    password : DBpassword,
    database : DBdatabase,
    multipleStatements:true
};

/**
 * send Query to Mysql
 * @param {string} query 
 * @param {function} callback 
 */
function sendQuery(query, callback) {
    var db = mysql.createConnection(DBinfo);
    db.query(query,callback);
    db.end();
}

module.exports = sendQuery;