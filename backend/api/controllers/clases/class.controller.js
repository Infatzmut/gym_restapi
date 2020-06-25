const setupDbServices = require('../../services');
const setupBaseController = require('../base.controller');
const baseController = new setupBaseController();
const dbServices = setupDbServices();
const {INTERNAL_SERVER_ERROR_CODE} = require('../../../util/Constants');

const get = async (req, res) => {
    let responseCode;
    let responseData;
    try {
        const {classId} = req.params;
        const classInfo = await dbServices.classService.getClassInfo(classId); 
        responseCode = classInfo.responseCode;
        if(classInfo.status.toLowerCase() == 'error'){
            responseData = baseController.getErrorResponse(classInfo.message,classInfo.data);
        } else {
            responseData = baseController.getSucessResponse(classInfo.status, classInfo.message, classInfo.data);
        }
    }catch(error){
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}

const create = async (req, res) => {
    let responseCode;
    let responseData;
    try {
        const {clientId, classId} = req.body;
        const classInfo = await dbServices.classService.create(clientId, classId); 
        responseCode = classInfo.responseCode;
        if(classInfo.status.toLowerCase() == 'error'){
            responseData = baseController.getErrorResponse(classInfo.message,classInfo.data);
        } else {
            responseData = baseController.getSucessResponse(classInfo.status, classInfo.message, classInfo.data);
        }
    }catch(error){
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}


module.exports = {
    get,
    create
}