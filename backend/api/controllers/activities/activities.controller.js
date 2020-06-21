const setupDbServices = require('../../services');
const setupBaseController = require('../base.controller');
const baseController = new setupBaseController();
const dbServices = setupDbServices();
const {INTERNAL_SERVER_ERROR_CODE} = require('../../../util/Constants');

const getAll = async (req,res) => {
    let responseCode;
    let responseData;
    try{
        let activities;
        const {query} = req.query;
        if(query) {
           activities = await dbServices.activitiesServices.getAll(query);
        } else {
        activities = await dbServices.activitiesServices.getAll();
        }        
        responseCode = activities.responseCode;
        if(activities.status.toLowerCase() === "error") {
            responseData = baseController.getErrorResponse(activities.message);
        } else {
            responseData = baseController.getSucessResponse(activities.status, activities.message, activities.data);
        }
    } catch(error){
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}




module.exports = {
    getAll
}