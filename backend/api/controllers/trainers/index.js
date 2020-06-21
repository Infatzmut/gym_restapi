const {Router} = require('express');
const router = Router();
const trainerController = require('./trainer.controller');
const trainersController = require('./trainers.controller');

router.get('/', trainersController.getAll);
router.get('/:id', trainerController.get);
router.post('/', trainersController.post);
router.post('/registerActivities', trainerController.registerActivities);
router.post('/:id/registerActivities', trainerController.registerActivities);
router.delete('/:id', trainerController.del);
router.get('/:id/activities', trainerController.getActivities);
router.get('/:id/scheduledActivities', trainerController.getScheduledActivities);

module.exports = router;