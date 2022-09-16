const cookieParser = require('cookie-parser');
const {COOKIE_SECRET} = require('../config');

async function cookie_loader(app){
    app.use(cookieParser(COOKIE_SECRET));
    return;
}

module.exports = cookie_loader;