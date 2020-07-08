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

    async function getAll(query = null){
        let trainers;
        if(query) {
            trainers = await dbInstance.query(`select id_colaborador, nombre, apellido_paterno, email, telefono,direccion 
                                    from colaboradores where nombre like %${query}% or apellido_paterno like %${query}% and estado = 1`)
        } else {
            trainers = await dbInstance.query(`select id_colaborador, nombre, apellido_paterno, email, telefono,direccion 
                                    from colaboradores where categoria like "%entrenador%" or categoria like "%ENTRE%" and estado = 1`);
            baseService.getServiceResponse(SUCCESS_STATUS,SUCCESS_CODE
                                     , "trainers", trainers)   
        }
    return baseService.returnData;
    }
    async function create(trainer) {
        const errors = []
        //validators.createUser(trainer, errors);
        if(errors.length > 0) {
            baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE,
                         "Validation fields failed,see error description for more details ", errors)
        } else {
            const existentDocument = await dbInstance.query('select documento from colaboradores where documento = ? and estado = 1', [trainer.documento])
            const existentEmail = await dbInstance.query('SELECT email FROM colaboradores where email = ? and estado = 1', [trainer.email]);
            if(existentDocument.length > 0) {
                errors.push('Duplicated Document Id, please add a diferent document id');
                baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE,
                         'Duplicated field id , see errors for more details', errors);
            } else if(existentEmail.length > 0) {    
                errors.push('Duplicated Email Id , please add a diferent email')
                baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE,
                        'Duplicated field id , see errors for more details', errors);
           } else {
                const newTrainer = await dbInstance.query('insert into colaboradores set ?',[trainer]);
                baseService.getServiceResponse(SUCCESS_STATUS, CREATED_CODE,
                             "Trainer created", {userId: newTrainer.insertId,
                                              ref: `${BASE_URL}/trainer/${newTrainer.insertId}` });
            }
        }
        return baseService.returnData;
    }

    const get = async (id) => {
        const trainer = await dbInstance.query('select * from colaboradores where id_colaborador = ? and estado = 1', [id])
        if(trainer.length == 0){
            baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE,"Trainer not found",  "Trainer not found");
        } else {
            baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_CODE, "Fetched trainer data", trainer[0]);
        }
        return baseService.returnData;
    }
    
    //TODO: Improve validator
    const update = async (id, newTrainer) => {
        const errors = [];
        const trainer = await dbInstance.query('select * from colaboradores where id_colaborador = ? and estado = 1', [id])
        if(trainer.length == 0){
            baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE,"Trainer not found", "Trainer not found");
        } else {
            const documentExist = await dbInstance.query('select id_colaborador,documento from colaboradores where documento = ? and estado = 1', [newTrainer.documento])
            if(documentExist.length > 0 && documentExist[0].id_colaborador !== id) {
                errors.push('Document field must be unique, please add a diferent document id');
                baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE,
                         'Document field must be unique', errors);
            } else {
                //validators.modify(customer, errors);
                if(errors.length > 0) {
                 baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE,
                         "Validation fields failed,see error description for more details ",errors)
                } else {
                    let modifiedTrainer = await dbInstance.query('update colaboradores set ? where id_colaborador=? and estado = 1', [newTrainer, id])
                    baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_CODE, "modified succesfully", modifiedTrainer)
                }
            }
        }
        return baseService.returnData;
    }

    const deleteTrainer = async (id) => {
        const trainerToDelete = await dbInstance.query('select * from colaboradores where id_colaborador = ? and estado = 1', [id]);
        if(trainerToDelete.length == 0) {
            baseService.getServiceResponse(ERROR_STATUS, NOT_FOUND, "Trainer not found", "Trainer not found");
        } else {
            await dbInstance.query('update colaboradores set estado = 0 where id_colaborador = ?', [id]);
            baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_NO_CONTENT, "Trainer deleted successfully", true);
        }
        return baseService.returnData;
    }

    const registerActivity = async (trainerId,activityId) =>{
        const trainer = await dbInstance.query('select categoria from colaboradores where id_colaborador = ? and estado = 1', [trainerId]);
        if(trainer.length == 0) {
            baseService.getServiceResponse(ERROR_STATUS, NOT_FOUND, "Trainer not found", "Trainer not found");
        } else if(trainer[0].categoria.toLowerCase() !== "entrenador") {
            baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE, "Not a trainer", "Not a trainer");
        } else {
            const registeredActivity = await dbInstance.query('select id_actividad from actividades_entrenador where id_entrenador = ? and id_actividad = ?', [trainerId, activityId]);
            if( registeredActivity.length > 0 && registeredActivity[0].id_actividad == activityId){
                baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE, "Duplicated Register", "Activity already registered to trainer");
            } else {
                const trainerActivity = await dbInstance.query('insert into actividades_entrenador set id_entrenador = ? , id_actividad = ?', [trainerId, activityId])
                baseService.getServiceResponse(SUCCESS_STATUS, CREATED_CODE, "Activity added to trainer", {id: trainerActivity.insertId});
            }
        }
        return baseService.returnData;
    }

    const getActivities = async (trainerId) => {
        const trainer = await dbInstance.query(`select categoria from colaboradores where id_colaborador = ? and estado = 1`, [trainerId]);
        if(trainer.length == 0) {
            baseService.getServiceResponse(ERROR_STATUS, NOT_FOUND, "Trainer not found","Trainer not found");
        } else {
            if(trainer[0].categoria.toLowerCase() !== "entrenador") {
                baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE, "Not a trainer", "Not a trainer");
            } else {
                const trainerActivities = await dbInstance.query(`select  a.id_actividad, a.nombre, a.descripcion 
                                                from actividades_entrenador ae
                                                left join actividades a on a.id_actividad = ae.id_actividad
                                                inner join colaboradores c on  c.id_colaborador = ae.id_entrenador
                                                where c.id_colaborador = ?`,[trainerId])                               
                baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_CODE, "Fetching trainer activities", trainerActivities);
            }
        }
        return baseService.returnData;
    }
    
    const getScheduledActivities = async (trainerId, time = "future") => {
        const trainer = await dbInstance.query('select categoria from colaboradores where id_colaborador = ? and estado = 1', [trainerId]);
        if(trainer.length == 0) {
            baseService.getServiceResponse(ERROR_STATUS, NOT_FOUND, "Trainer not found", "Trainer not found");
        } else if(trainer[0].categoria.toLowerCase() !== "entrenador"){
            baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE, "Not a trainer", "Not a trainer");
        } else {
            let actualDate = new Date().toISOString()
            actualDate = actualDate.substring(0, actualDate.indexOf('T'));
            let sActivities;
            switch(time) {
                case "total":  sActivities = await dbInstance.query(`select d.fechal, d.capacidad, bh.hora_inicio, bh.hora_fin, a.nombre 
                                                            from detalle_actividad d
                                                            inner join actividades_entrenador e on e.id_act_entrenador = d.id_actividad_ent 
                                                            inner join actividades a on a.id_actividad = e.id_actividad
                                                            inner join bloque_horario bh on bh.id_bloque_horario = d.id_bloque_horario
                                                            where e.id_entrenador = ? `, [trainerId]);
                                break;
                case "past":    sActivities = await dbInstance.query(`select d.fechal, d.capacidad, bh.hora_inicio, bh.hora_fin, a.nombre 
                                                            from detalle_actividad d
                                                            inner join actividades_entrenador e on e.id_act_entrenador = d.id_actividad_ent 
                                                            inner join actividades a on a.id_actividad = e.id_actividad
                                                            inner join bloque_horario bh on bh.id_bloque_horario = d.id_bloque_horario 
                                                            where e.id_entrenador = ? and d.fechal <= ${actualDate}`, [trainerId]);
                                break;     
                default:        sActivities = await dbInstance.query(`select d.fechal, d.capacidad, bh.hora_inicio, bh.hora_fin, a.nombre 
                                                            from detalle_actividad d
                                                            inner join actividades_entrenador e on e.id_act_entrenador = d.id_actividad_ent 
                                                            inner join actividades a on a.id_actividad = e.id_actividad
                                                            inner join bloque_horario bh on bh.id_bloque_horario = d.id_bloque_horario
                                                            where e.id_entrenador = ? and d.fechal >= ${actualDate}`, [trainerId]);
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
        getScheduledActivities,
        getActivities
    }
}