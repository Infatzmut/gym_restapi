const setupBaseService = require('./base.service');
const {SUCCESS_CODE, SUCCESS_STATUS, ERROR_STATUS} = require('../../util/Constants');

module.exports = function setupScheduleServices (dbInstance) {
    const baseService = new setupBaseService();
    const getHours = () => {
        const schedule = await dbInstance.query(`select * from bloque_horario`);
        baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_CODE, "Fetching hours", schedule);
        return baseService.returnData;
    }

    const getEvents = (query = 10) => {
        const events = await dbInstance.query(`select d.id_detalle_actividad,ae.id_entrenador, a.nombre, c.nombre, c.apellido_paterno  
                                                    from detalle_actividad d 
                                                    left join  actividades_entrenador ae on ae.id_act_ent = d.id_act_entrenador
                                                    inner join actividades a on ae.id_actividad = a.id_actividad
                                                    inner join colaboradores c on c.id_colaborador = ae.id_entrenador
                                                    where c.estado = 1
                                                    limit ${query}`);
        baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_CODE, `Fetching all events limited by ${query}`, events);
        return baseService.returnData                                            
    }
    
    return {
        getHours,
        getEvents
    }
}