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
        const customer = await dbServices.customerServices.getCustomer(id);
        responseCode = customer.responseCode;
        responseData = baseController.getSucessResponse(customer.status, customer.message, customer.data);
    }catch(error){
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}

const update = async (req, res) => {
    let responseCode;
    let responseData;
    try{
        const {id} = req.params;
        const {body} = req;
        const updatedCustomer = await dbServices.customerServices.update(id, body);
        responseCode = updatedCustomer.responseCode;
        responseData = baseController.getSucessResponse(updatedCustomer.status, updatedCustomer.message, updatedCustomer.data);
    }catch(error){
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}

const del = async (req, res) => {
    let responseCode;
    let responseData;
    try{
        const {id} = req.params;
        const deletedCustomer = await dbServices.customerServices.deleteCustomer(id);
        responseCode = deletedCustomer.responseCode;
        responseData = baseController.getSucessResponse(deletedCustomer.status, deletedCustomer.message, deletedCustomer.data);
    }catch(error){
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = baseController.getErrorResponse(error.message)
    }
    return res.status(responseCode).send(responseData);
}

module.exports = {
    get,
    update,
    del
}