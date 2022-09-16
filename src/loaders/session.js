const session = require('express-session');
const {COOKIE_SECRET} = require('../config');

async function session_loader(app){
    app.use(session({

    }));
    return;
}

module.exports = session_loader;