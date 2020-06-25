const setupCustomerServices = require('./customers.services');
const setupTrainerServices = require('./trainer.services');
const setupActivitiesServices = require('./activities.services');
const setupClassServices = require('./classes.services')
const dbConnection = require('../../providers/database');
module.exports = function(){
    const customerServices = setupCustomerServices(dbConnection);
    const trainerServices = setupTrainerServices(dbConnection);
    const activitiesServices = setupActivitiesServices(dbConnection);
    const classService = setupClassServices(dbConnection);
    
    return {
        customerServices,
        trainerServices,
        activitiesServices,
        classService
    }
}