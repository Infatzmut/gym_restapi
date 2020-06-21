const setupDbServices = require('../../services');
const setupBaseController = require('../base.controller');
const baseController = new setupBaseController();
const dbServices = setupDbServices();
const {INTERNAL_SERVER_ERROR_CODE} = require('../../../util/Constants');

const get = async (req, res) => {
    let responseCode;
    let responseData;
    try{
        const {id} = req.params;
        const activity = await dbServices.activitiesServices.get(id);
        responseCode = activity.responseCode;
        if(activity.status.toLowerCase() == "error") {
            responseData = baseController.getErrorResponse(activity.message);
        } else {
            responseData = baseController.getSucessResponse(activity.status, activity.message, activity.data);
        }
    }catch(error){
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}

const del = async (re, res) => {
    let responseCode;
    let responseData;
    try{
        const {id} = req.params;
        const activity = await dbServices.activitiesServices.del(id);
        responseCode = activity.responseCode;
        if(activity.status.toLowerCase() == "error") {
            responseData = baseController.getErrorResponse(activity.message);
        } else {
            responseData = baseController.getSucessResponse(activity.status, activity.message, activity.data);
        }
    }catch(error){
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}

const getScheduledClases = async (req, res) => {
    let responseCode;
    let responseData;
    try{
        const {id} = req.params;
        const scheduledClases = await dbServices.activitiesServices.getScheduledClases(id);
        responseCode = scheduledClases.responseCode;
        if(scheduledClases.status.toLowerCase() == "error") {
            responseData = baseController.getErrorResponse(scheduledClases.message);
        } else {
            responseData = baseController.getSucessResponse(scheduledClases.status, scheduledClases.message, scheduledClases.data);
        }
    }catch(error){
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}
module.exports = {
    get,
    del,
    getScheduledClases
}