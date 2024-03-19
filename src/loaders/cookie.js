const cookieParser = require('cookie-parser');

async function cookie_loader(app){
    app.use(cookieParser());
    return;
}

module.exports = cookie_loader;
