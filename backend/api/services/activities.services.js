const setupBaseService = require('./base.service');
const {
    ERROR_STATUS, 
    BAD_REQUEST_CODE, 
    SUCCESS_CODE, 
    SUCCESS_NO_CONTENT,
    CREATED_CODE,
    NOT_FOUND,
    SUCCESS_STATUS
    } = require('../../util/Constants');

module.exports = function setupActivitiesServices(dbInstance) {
    const baseService = new setupBaseService();

    const get = async (id) => {
        const activity = await dbInstance.query('select * from actividades where id_actividad = ?', [id]);
        if(activity.length == 0) {
            baseService.getServiceResponse(ERROR_STATUS, NOT_FOUND, "Activity not found", {});
        } else {
            baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_CODE, "Activity info", activity)
        }
        return baseService.returnData;
    }
    
    const getAll = async (query = null) => {
        let activities;
        if(query) {
            activities = await dbInstance.query(`select * from actividades where nombre like %${query}%`)
        } else {
            activities = await dbInstance.query('select * from actividades');
        }       
        baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_CODE, "Activities list", activities);
        return baseService.returnData;
    }
    
    const create = async (activity) => {
        if(!activity || !activity.descripcion) {
            baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE, "No activity sent", {})
        } else {
            const createdActivity = await dbInstance.query('insert into actividades set ?', [activity]);
            baseService.getServiceResponse(SUCCESS_STATUS, constants.CREATED_CODE, "Activity created", {id: createdActivity.insertId})
        }
        return baseService.returnData;
    }
    
    const update = async () => {
    
    }
    
    const del = async (id) => {
        const activity = await dbInstance.query('select * from actividades where id_actividad = ?', [id]);
        if(activity.length == 0) {
            baseService.getServiceResponse(ERROR_STATUS, NOT_FOUND, "Activity not found", {});
        } else {
            await dbInstance.query('delete from actividades where id_actividad = ?', [id]);
            baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_NO_CONTENT, "Activity deleted", true);
        }
        return baseService.returnData;
    }
    
    const getScheduledClases = async (activityid) => {
        const currentDate = new Date();
        if(!activityid) {
            baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE, "No activity sended", {})
        } else {
            const scheduledClases = await dbInstance.query(`select c.nombre, c.apellido_paterno, da.fechal, da.capacidad, bh.hora_inicio, bh.hora_fin ,a.nombre as titulo, a.descripcion
                                        from actividades a
                                        inner join actividades_entrenador ae on ae.id_actividad = a.id_actividad
                                        inner join detalle_actividad da on da.id_actividad_ent = ae.id_act_entrenador
                                        inner join colaboradores c on c.id_colaborador = ae.id_entrenador 
                                        inner join bloque_horario bh on da.id_bloque_horario = bh.id_bloque_horario
                                        where a.id_actividad = ?`, [activityid])
            baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_CODE, "Fetching scheduled clases", scheduledClases);
        }
        return baseService.returnData;                            
    }
    return {
        get,
        getAll,
        //create,
        //update,
        del,
        getScheduledClases
    }
}


