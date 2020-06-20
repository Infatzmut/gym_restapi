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
        const trainer = await dbServices.trainerServices.get(id);
        responseCode = trainer.responseCode;
        if(trainer.status.toLowerCase() == 'error') {
            responseData = baseController.getErrorResponse(trainer.message);
        } else {
            responseData = baseController.getSucessResponse(trainer.status, trainer.message, trainer.data);
        }
    }catch(error){
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = error.message
    }
    return res.status(responseCode).json(responseData);
}

const update =async (req, res) => {
    let responseCode;
    let responseData;
    try{
        const {id} = req.params;
        const {body} = req;
        const trainer = await dbServices.trainerServices.update(id, body);
        responseCode = trainer.responseCode;
        if(trainer.status.toLowerCase() == 'error') {
            responseData = baseController.getErrorResponse(trainer.message);
        } else {
            responseData = baseController.getSucessResponse(trainer.status, trainer.message, trainer.data);
        }
    }catch(error){
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = error.message
    }
    return res.status(responseCode).json(responseData);
}

const del = async (req, res) => {
    let responseCode;
    let responseData;
    try{
        const {id} = req.params;
        const trainer = await dbServices.trainerServices.deleteTrainer(id);
        responseCode = trainer.responseCode;
        if(trainer.status.toLowerCase() == 'error') {
            responseData = baseController.getErrorResponse(trainer.message);
        } else {
            responseData = baseController.getSucessResponse(trainer.status, trainer.message, trainer.data);
        }
    }catch(error){
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = error.message
    }
    return res.status(responseCode).json(responseData);
}

const getActivities = async (req, res) => {
    let responseCode;
    let responseData;
    try{
        const {id} = req.params;
        const {time} = req.query;
        let activities;
        if(time) {
            activities = await dbServices.trainerServices.getScheduledActivities(id, time);
        } else {
            activities = await dbServices.trainerServices.getScheduledActivities(id);
        }
        responseCode = activities.responseCode;
        if(activities.status.toLowerCase() == "error"){
            responseData = baseController.getErrorResponse(activities.message)
        } else {
            responseData = baseController.getSucessResponse(activities.status, activities.message, activities.data);
        }
    }catch(error){
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = error.message
    }
    return res.status(responseCode).json(responseData);
}

const getScheduledActivities = async (req, res) => {
    let responseCode;
    let responseData;
    try{

    }catch(error){
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = error.message
    }
    return res.status(responseCode).json(responseData);
}

module.exports = {
    get,
    update,
    del,
    getActivities,
    getScheduledActivities
}