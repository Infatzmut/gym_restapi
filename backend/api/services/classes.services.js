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

module.exports = function setupClassServices(dbInstance) {
    const baseService = new setupBaseService();

    const getClassInfo = async (classId) => {
        if(!classId){
            baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE, "INVALID SEARCH PARAMETER", "NO CLASS ID SENDED");
        } else {
            const classInfo = await dbInstance.query(`select a.* , da.*, c.nombre, c.apellido_paterno 
                                                      from detalle_actividad da  
                                                      inner join actividades_entrenador ae on ae.id_act_entrenador = da.id_actividad_ent  
                                                      inner join actividades a on a.id_actividad = ae.id_actividad
                                                      inner join colaboradores c on ae.id_entrenador = c.id_colaborador
                                                      where id_detalle_actividad = ? and c.estado = 1`, [classId]);
            baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_CODE, "Fetching data for selected class", classInfo);
        }
        return baseService.returnData;
    }

    const getAllScheduledClases = async () => {
        const allClasses = await dbInstance.query('select * from actividad_cliente');
        baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_CODE, "Fetching classes", allClasses);
        return baseService.returnData;
    }

    const create = async  (customerId, classId) => {
        if(!customerId || !classId){
            baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE, "INCOMPLETE DATA, PLEASE COMPLETE THE DATA TO PROCCED", "NO CUSTOMERID OR CLASSID FOUND");
        } else {
            const registeredActivity = await dbInstance.query("select * from actividad_cliente where id_cliente = ? and id_detalle_act = ?", [customerId, classId]);
            const existantClass = await dbInstance.query('select * from detalle_actividad where id_detalle_actividad = ?', [classId]);
            if(existantClass.lenght === 0 ) {
                baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE, "BAD REQUEST FOR CLASS", "CLASS NOT FOUND");
            } else if (existantClass[0].capacidad === 0)  {
                baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE, "NO MORE CAPACITY", "THE CLASS YOU LOOKED FOR HAS NO MORE SPACES");
            } else if (registeredActivity.length > 0){
                baseService.getServiceResponse(ERROR_STATUS, BAD_REQUEST_CODE, "DUPLICATED REGISTER", "CLIENT IS ALREADY REGISTERED ON THIS CLASS");
            } else {
                let capacidadActual = existantClass[0].capacidad -1;
                const registerCustomerClass = await dbInstance.query('insert into actividad_cliente(id_cliente, id_detalle_act) values (?,?)', [customerId, classId]);
                await dbInstance.query("update detalle_actividad set capacidad = ? ", [capacidadActual]);
                baseService.getServiceResponse(SUCCESS_STATUS, CREATED_CODE, "REGISTER CUSTOMER CLASS", {"id" :registerCustomerClass.insertId});
            }
        }
        return baseService.returnData;
    }

    return {
        getClassInfo,
        create,
        getAllScheduledClases
    }
}