const setupBaseService = require('./base.service');
const constants = require('../../util/Constants');

module.exports = function setupActivitiesServices(dbInstance) {
    const baseService = new setupBaseService();

    const get = async (id) => {
        const activity = await dbInstance.query('select * from actividades where id = ?', [id]);
        if(activity.length == 0) {
            baseService.getServiceResponse(ERROR_STATUS, NOT_FOUND, "Activity not found", {});
        } else {
            baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_CODE, "Activity info", activity)
        }
        return baseService.returnData
    }
    
    const getAll = async (query = null) => {
        let activities;
        if(query) {
            activities = await dbInstance.query(`select * from actividades where descripcion like %${query}%`)
        } else {
            activities = await dbInstance.query('select * from actividades');
        }       
        if(activities.length > 0 ) {
            baseService.getServiceResponse(ERROR_STATUS, NOT_FOUND, "Activities not found", {});
        } else {
            baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_CODE, "Activities list", activities);
        }
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
        const activity = await dbInstance.query('select * from actividades where id = ?', [id]);
        if(activity.length == 0) {
            baseService.getServiceResponse(ERROR_STATUS, NOT_FOUND, "Activity not found", {});
        } else {
            await dbInstance.query('delete from actividades where id = ?', [id]);
            baseService.getServiceResponse(SUCCESS_STATUS, SUCCESS_NO_CONTENT, "Activity deleted", true);
        }
        return baseService.returnData;
    }
    
    return {
        get,
        getAll,
        //create,
        //update,
        del
    }
}


