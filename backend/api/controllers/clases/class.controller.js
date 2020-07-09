const setupDbServices = require('../../services');
const setupBaseController = require('../base.controller');
const baseController = new setupBaseController();
const dbServices = setupDbServices();
const {INTERNAL_SERVER_ERROR_CODE} = require('../../../util/Constants');


const create = async (req, res) => {
    let responseCode;
    let responseData;
    try {
        const classInfo = await dbServices.classService.create(req.body); 
        responseCode = classInfo.responseCode;
        if(classInfo.status.toLowerCase() == 'error'){
            responseData = baseController.getErrorResponse(classInfo.message,classInfo.data);
            console.log(responseData)
        } else {
            responseData = baseController.getSucessResponse(classInfo.status, classInfo.message, classInfo.data);
        }
        
    }catch(error){
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = baseController.getErrorResponse(error.message);
        console.log(error);
        
    }
    return res.status(responseCode).json(responseData);
}

const getAll = async (req, res) => {
    let responseCode;
    let responseData;
    try {
        const allClasses = await dbServices.classService.getAllScheduledClases();
        responseCode = allClasses.responseCode;
        responseData = baseController.getSucessResponse(allClasses.status, allClasses.message, allClasses.data);
    }catch(error){
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = baseController.getErrorResponse(error.message)
    }
    return res.status(responseCode).json(responseData);
}

module.exports = {
    create,
    getAll
}