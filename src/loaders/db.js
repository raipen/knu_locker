const studentModel = require('../models/Student');
const applyModel = require('../models/Apply');
const applicantModel = require('../models/Applicant');

async function db_loader(app){
    /* await studentModel.sync({ alter: true });
    await applyModel.sync({ alter: true });
    await applicantModel.sync({ alter: true }); */
    
    return;
}

module.exports = db_loader;