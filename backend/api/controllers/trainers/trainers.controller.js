
const setupDbServices = require('../../services');
const setupBaseController = require('../base.controller');
const baseController = new setupBaseController();
const dbServices = setupDbServices();
const {INTERNAL_SERVER_ERROR_CODE} = require('../../../util/Constants');
const { validationResult } = require('express-validator');

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
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        responseCode = 400;
        responseData= baseController.getErrorResponse("Error on validation", errores.array())
    } else {
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
    }
    return res.status(responseCode).json(responseData);
}
module.exports = {
    getAll,
    post
}