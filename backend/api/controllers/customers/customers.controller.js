const setupDbServices = require('../../services');
const setupBaseController = require('../base.controller');
const baseController = new setupBaseController();
const dbServices = setupDbServices();
const {validationResult} = require('express-validator')
const {INTERNAL_SERVER_ERROR_CODE} = require('../../../util/Constants');
const getAll = async (req, res) => {
    let responseCode;
    let responseData;
    try {
        const customers = await dbServices.customerServices.getCustomers();
        responseCode = customers.responseCode;
        responseData = baseController.getSucessResponse(customers.status, customers.message, customers.data);
    } catch(error){
        console.log(error)
        responseCode = INTERNAL_SERVER_ERROR_CODE;
        responseData = baseController.getErrorResponse(error.message);
    }
    return res.status(responseCode).json(responseData);
}

const add = async (req, res) => {
    let responseCode;
    let responseData;
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        responseCode = 400;
        responseData= baseController.getErrorResponse("Error on validation", errores.array())
    } else {
        try{
            const newCustomer = {
                ...req.body,
                fecha_alta : new Date(),
                sede_id : 1,
            }
            const addCustomer = await dbServices.customerServices.create(newCustomer);
            responseCode = addCustomer.responseCode;
            if(addCustomer.status.toLowerCase() === 'error') {
                responseData = baseController.getErrorResponse(addCustomer.message, addCustomer.data.error);
            } else {
                responseData = baseController.getSucessResponse(addCustomer.status, addCustomer.message, addCustomer.data);
            }
        } catch(error) {
            responseCode = INTERNAL_SERVER_ERROR_CODE;
            responseData = baseController.getErrorResponse(error.message); 
        }
    } 
    return res.status(responseCode).json(responseData);
}


module.exports = {
    getAll,
    add
}