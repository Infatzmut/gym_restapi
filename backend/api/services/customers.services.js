const setupBaseService = require('./base.service');
const validators = require('./validation');
const constants = require('../../util/Constants');
const {BASE_URL} = require('../../config');
module.exports = function setupCustomerServices(dbInstance){
    const baseService = new setupBaseService();

    async function getCustomers(){
        const customers = await dbInstance.query('select * from clientes');
        baseService.getServiceResponse(constants.SUCCESS_STATUS,constants.SUCCESS_CODE
                                 , "customers", customers)
    return baseService.returnData;
    }
    async function create(customer) {
        const errors = []
        validators.createUser(customer, errors);
        if(errors.length > 0) {
            baseService.getServiceResponse(constants.ERROR_STATUS, constants.BAD_REQUEST_CODE,
                         "Validation fields failed,see error description for more details ", {error: errors})
        } else {
            const existentDocument = await dbInstance.query('select documentoId from clientes where documentoId = ?', [customer.documentoId])
            const existentEmail = await dbInstance.query('SELECT email FROM clientes where email = ?', [customer.email]);
            if(existentDocument.length > 0) {
                baseService.getServiceResponse(constants.ERROR_STATUS, constants.BAD_REQUEST_CODE,
                         'Duplicated field id , see errors for more details', {error: 'Duplicated Document Id, please add a diferent document id'});
            } else if(existentEmail.length > 0) {    
                baseService.getServiceResponse(constants.ERROR_STATUS, constants.BAD_REQUEST_CODE,
                        'Duplicated field id , see errors for more details', {error: 'Duplicated Email Id , please add a diferent email'});
           } else {
                const newCustomer = await dbInstance.query('insert into clientes set ?',[customer]);
                console.log(newCustomer, newCustomer.insertId);
                baseService.getServiceResponse(constants.SUCCESS_STATUS, constants.CREATED_CODE,
                             "User created", {userId: newCustomer.insertId,
                                              ref: `${BASE_URL}/customer/${newCustomer.insertId}/info` });
            }
        }
        return baseService.returnData;
    }

    const getCustomer = async (id) => {
        const customer = await dbInstance.query('select * from clientes where id = ?', [id])
        if(customer.length == 0){
            baseService.getServiceResponse(constants.ERROR_STATUS, constants.BAD_REQUEST_CODE,"Customer not found", {});
        } else {
            baseService.getServiceResponse(constants.SUCCESS_STATUS, constants.SUCCESS_CODE, "Fetched customer data", customer[0]);
        }
        return baseService.returnData;
    }
    
    const update = async (id, newCustomer) => {
        const errors = [];
        const customer = await dbInstance.query('select * from clientes where id = ?', [id])
        if(customer.length == 0){
            baseService.getServiceResponse(constants.ERROR_STATUS, constants.BAD_REQUEST_CODE,"Customer not found", {});
        } else {
            const documentExist = await dbInstance.query('select id,documentoId from clientes where documentoId = ?', [newcustomer.documentoId])
            if(documentExist.length > 0 && documentExist[0] !== id) {
                baseService.getServiceResponse(constants.ERROR_STATUS, constants.BAD_REQUEST_CODE,
                         'Document field must be unique', {error: 'Document field must be unique, please add a diferent document id'});
            } else {
                validators.modify(customer, errors);
                if(errors.length > 0) {
                 baseService.getServiceResponse(constants.ERROR_STATUS, constants.BAD_REQUEST_CODE,
                         "Validation fields failed,see error description for more details ", {error: errors})
                } else {
                    let modifiedCustomer = await dbInstance.query('update clientes set ? where id=?', [newCustomer, id])
                    baseService.getServiceResponse(constants.SUCCESS_STATUS, constants.SUCCESS_CODE, "modified succesfully", modifiedCustomer)
                }
            }
        }
        return baseService.returnData;
    }

    const deleteCustomer = async (id) => {
        const deletedCustomer = await dbInstance.query('delete from clients where id = ?', [id]);
        console.log(deletedCustomer)
        baseService.getServiceResponse(constants.SUCCESS_STATUS, constants.SUCCESS_NO_CONTENT, "Customer deleted successfully", {});
        return baseService.returnData;
    }
    
    return {
        getCustomers,
        getCustomer,
        update,
        create,
        deleteCustomer
    }
}