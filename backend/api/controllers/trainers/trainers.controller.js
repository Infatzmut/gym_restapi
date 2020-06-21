
const setupDbServices = require('../../services');
const setupBaseController = require('../base.controller');
const baseController = new setupBaseController();
const dbServices = setupDbServices();
const {INTERNAL_SERVER_ERROR_CODE} = require('../../../util/Constants');

const add = async (req, res) => {
    let responseCode;
    let responseData;
    try{
        const newTrainer = {
            ...req.body,
            fecha_alta : new Date(),
            idSede : 1,
        }
        const addTrainer = await dbServices.trainerServices.create(newTrainer);
        responseCode = addTrainer.responseCode;
        if(addTrainer.status.toLowerCase() === 'error') {
            responseData = baseController.getErrorResponse(addTrainer.message, addTrainer.data.error);
        } else {
            responseData = baseController.getSucessResponse(addTrainer.status, addTrainer.message, addTrainer.data);
        }
    } catch(error) {
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = baseController.getErrorResponse(error.message); 
    }
    return res.status(responseCode).json(responseData);
}

const getAll = async (req, res) => {
    let responseCode;
    let responseData;
    try{
        const trainers = await dbServices.trainerServices.getAll();
        responseCode = trainers.responseCode;
        responseData = baseController.getSucessResponse(trainers.responseCode, trainers.message, trainers.data);
    }catch(error){
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}

const post = async (req, res) => {
    let responseCode;
    let responseData;
    try {
        const {body} = req;
        const newTrainer = {
            ...body,
            fecha_alta : new Date(),
            sede_id : 1,
        }

        const addedTrainer = await dbServices.trainerServices.create(newTrainer);
        responseCode = addedTrainer.responseCode;
        if(addedTrainer.status.toLowerCase() === 'error') {
            responseData = baseController.getErrorResponse(addedTrainer.message, addedTrainer.data.error);
        } else {
            responseData = baseController.getSucessResponse(addedTrainer.status, addedTrainer.message, addedTrainer.data);
        }
    }catch(error){
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}
module.exports = {
    add,
    getAll,
    post
}