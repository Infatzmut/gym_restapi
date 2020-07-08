const setupBaseService = require('./base.service');
const validators = require('./validation');
const {
    ERROR_STATUS, 
    BAD_REQUEST_CODE, 
    SUCCESS_CODE, 
    SUCCESS_NO_CONTENT,
    CREATED_CODE,
    NOT_FOUND,
    SUCCESS_STATUS
    } = require('../../util/Constants');
const {BASE_URL} = require('../../config');
module.exports = function setupCustomerServices(dbInstance){
    const baseService = new setupBaseService();

    async function getCustomers(){
        const customers = await dbInstance.query('select * from clientes where estado = 1');
        baseService.getServiceResponse(SUCCESS_STATUS,SUCCESS_CODE
                                 , "customers", customers)
    return baseService.returnData;
    }
    async function create(customer) {
        const errors = []
        validators.createUser(customer, errors);
        if(errors.length > 0) {
            baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE,
                         "Validation fields failed,see error description for more details ", {error: errors})
        } else {
            const existentDocument = await dbInstance.query('select documento from clientes where documento = ? and estado = 1', [customer.documento])
            const existentEmail = await dbInstance.query('SELECT email FROM clientes where email = ? and estado = 1', [customer.email]);
            if(existentDocument.length > 0) {
                baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE,
                         'Duplicated field id , see errors for more details', {error: 'Duplicated Document Id, please add a diferent document id'});
            } else if(existentEmail.length > 0) {    
                baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE,
                        'Duplicated field id , see errors for more details', {error: 'Duplicated Email Id , please add a diferent email'});
           } else {
                const newCustomer = await dbInstance.query('insert into clientes set ?',[customer]);
                baseService.getServiceResponse(SUCCESS_STATUS, CREATED_CODE,
                             "User created", {userId: newCustomer.insertId,
                                              cliente: customer,  
                                              ref: `${BASE_URL}/customer/${newCustomer.insertId}` });
            }
        }
        return baseService.returnData;
    }

    const getCustomer = async (id) => {
        const customer = await dbInstance.query('select * from clientes where id_cliente = ? and estado =1', [id])
        if(customer.length == 0){
            baseService.getServiceResponse(ERROR_STATUS, NOT_FOUND,"Customer not found", {});
        } else {
            baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_CODE, "Fetched customer data", customer[0]);
        }
        return baseService.returnData;
    }
    
    const update = async (id, newCustomer) => {
        const errors = [];
        const customer = await dbInstance.query('select * from clientes where id_cliente = ? and estado = 1', [id])
        if(customer.length == 0){
            baseService.getServiceResponse(ERROR_STATUS, NOT_FOUND,"Customer not found", "Customer not found");
        } else {
            const documentExist = await dbInstance.query('select id_cliente,documento from clientes where documento = ? and estado = 1', [newCustomer.documento])
            if(documentExist.length > 0 && documentExist[0].id_cliente !== id) {
                errors.push('Document field must be unique, please add a diferent document id')
                baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE,
                         'Document field must be unique', errors);
            } else {
                //validators.modify(customer, errors);
                if(errors.length > 0) {
                 baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE,
                         "Validation fields failed,see error description for more details ", errors)
                } else {
                    let modifiedCustomer = await dbInstance.query('update clientes set ? where id_cliente = ?', [newCustomer, id])
                    baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_CODE, "modified succesfully", {"href": `${BASE_URL}customers/${id}`})
                }
            }
        }
        return baseService.returnData;
    }

    const deleteCustomer = async (id) => {
        const customer = await dbInstance.query('select nombre from clientes where id_cliente = ? and estado = 1', [id]);
        if(customer.length == 0) {
            baseService.getServiceResponse(ERROR_STATUS, NOT_FOUND, "No existent customer", {});
        } else {
            await dbInstance.query('update clientes set estado = 0 where id_cliente = ?', [id]);
            baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_NO_CONTENT, "Customer deleted successfully", true);
        }
        return baseService.returnData;
    }
    
    const getClassesPerCustomer = async (customerId) => {
        if(!customerId) {
            baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE, "INVALID SEARCH PARAMETER", "NO CUSTOMER ID SENDED");
        } else {
            const classesPerCustomer = await dbInstance.query(`select  bh.hora_inicio,bh.hora_fin, a.nombre as actividad, da.fechal. c.nombre, c.apellido_paterno 
                                                                from actividad_cliente ac 
                                                                inner join detalle_actividad da on ac.detalle_act = da.id_detalle_actividad
                                                                inner join bloque_horario bh on bh.id_bloque_horario = da.id_bloque_horario
                                                                inner join actividades_entrenador ae on ae.id_act_entrenador = da.id_actividad_ent
                                                                inner join actividades a on a.id_actividad = ae.id_actividad
                                                                inner join colaboradores c on c.id_colaborador = ae.id_entrenador 
                                                                where id_cliente = ? `, [customerId]);
            baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_CODE, "FETCHING CUSTOMER CLASES", classesPerCustomer);
        }
        return baseService.returnData;
    }
    return {
        getCustomers,
        getCustomer,
        update,
        create,
        deleteCustomer,
        getClassesPerCustomer
    }
}