const setupBaseService = require('./base.service');
const validators = require('./validation');
const {
    ERROR_STATUS, 
    BAD_REQUEST_CODE, 
    SUCCESS_CODE, 
    SUCCESS_NO_CONTENT,
    CREATED_CODE,
    NOT_FOUND
    } = require('../../util/Constants');
const {BASE_URL} = require('../../config');
module.exports = function setupCustomerServices(dbInstance){
    const baseService = new setupBaseService();

    async function getAll(query = null){
        let trainers;
        if(query) {
            trainers = await dbInstance.query(`select * from entrenadores where nombre like %${query}% or apellido_paterno like %${query}%`)
        } else {
            trainers = await dbInstance.query('select * from entrenadores');
            baseService.getServiceResponse(SUCCESS_STATUS,SUCCESS_CODE
                                     , "trainers", trainers)   
        }
    return baseService.returnData;
    }
    async function create(trainer) {
        const errors = []
        validators.createUser(trainer, errors);
        if(errors.length > 0) {
            baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE,
                         "Validation fields failed,see error description for more details ", {error: errors})
        } else {
            const existentDocument = await dbInstance.query('select documentoId from clientes where documentoId = ?', [customer.documentoId])
            const existentEmail = await dbInstance.query('SELECT email FROM clientes where email = ?', [customer.email]);
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
                                              ref: `${BASE_URL}/customer/${newCustomer.insertId}/info` });
            }
        }
        return baseService.returnData;
    }

    const get = async (id) => {
        const trainer = await dbInstance.query('select * from entrenadores where id = ?', [id])
        if(customer.length == 0){
            baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE,"Trainer not found", {});
        } else {
            baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_CODE, "Fetched trainer data", trainer[0]);
        }
        return baseService.returnData;
    }
    
    //TODO: Improve validator
    const update = async (id, newCustomer) => {
        const errors = [];
        const customer = await dbInstance.query('select * from clientes where id = ?', [id])
        if(customer.length == 0){
            baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE,"Customer not found", {});
        } else {
            const documentExist = await dbInstance.query('select id,documentoId from clientes where documentoId = ?', [newcustomer.documentoId])
            if(documentExist.length > 0 && documentExist[0] !== id) {
                baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE,
                         'Document field must be unique', {error: 'Document field must be unique, please add a diferent document id'});
            } else {
                validators.modify(customer, errors);
                if(errors.length > 0) {
                 baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE,
                         "Validation fields failed,see error description for more details ", {error: errors})
                } else {
                    let modifiedCustomer = await dbInstance.query('update clientes set ? where id=?', [newCustomer, id])
                    baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_CODE, "modified succesfully", modifiedCustomer)
                }
            }
        }
        return baseService.returnData;
    }

    const deleteTrainer = async (id) => {
        const trainerToDelete = await dbInstance.query('select * from entrenadores where id = ?', [id]);
        if(trainerToDelete.length == 0) {
            baseService.getServiceResponse(ERROR_STATUS, NOT_FOUND, "Trainer not found", {});
        } else {
            await dbInstance.query('delete from entrenadores where id = ?', [id]);
            baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_NO_CONTENT, "Trainer deleted successfully", true);
        }
        return baseService.returnData;
    }

    const registerActivity = async (trainerId,activityId) =>{
        const trainer = await dbInstance.query('select categoria from colaboradores where id_colaborador = ?', [trainerId]);
        if(trainer.length == 0) {
            baseService.getServiceResponse(ERROR_STATUS, NOT_FOUND, "Trainer not found", {});
        } else {
            if(trainer.categoria.toLowerCase() !== "entrenador") {
                baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE, "Not a trainer", {});
            } else {
                const trainerActivity = await dbInstance.query('insert into actividades_entrenador set id_entrenador = ? , id_actividad = ?', [trainerId, activityId])
                baseService.getServiceResponse(SUCCESS_STATUS, CREATED_CODE, "Activity added to trainer", {id: trainerActivity.insertId});
            }
        }
        return baseService.returnData;
    }
    
    const getScheduledActivities = async (trainerId, time = "future") => {
        const trainer = await dbInstance.query('select categoria from colaboradores where id_colaborador = ?', [trainerId]);
        if(trainer.length == 0) {
            baseService.getServiceResponse(ERROR_STATUS, NOT_FOUND, "Trainer not found", {});
        } else if(trainer.categoria.toLowerCase() !== "entrenador"){
            baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE, "Not a trainer", {});
        } else {
            const actualDate = new Date();
            let sActivities;
            switch(time) {
                case "total":  sActivities = await dbInstance.query(`select * from detalle_actividad d
                                                            inner join actividades_entrenador e on e.id_act_entrenador = d.id_actividad_ent 
                                                            where e.id_entrenador = ? `, [trainerId]);
                                break;
                case "past":    sActivities = await dbInstance.query(`select * from detalle_actividad d
                                                            inner join actividades_entrenador e on e.id_act_entrenador = d.id_actividad_ent 
                                                            where e.id_entrenador = ? and d.fecha <= ${actualDate}`, [trainerId]);
                                break;     
                default:        sActivities = await dbInstance.query(`select * from detalle_actividad d
                                                            inner join actividades_entrenador e on e.id_act_entrenador = d.id_actividad_ent 
                                                            where e.id_entrenador = ? and d.fecha >= ${actualDate}`, [trainerId]);
                                break;                      
            }
            baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_CODE, "Fetching future activities", sActivities)
        }
        return baseService.returnData;
    }


    return {
        getAll,
        get,
        update,
        create,
        deleteTrainer,
        registerActivity,
        getScheduledActivities
    }
}