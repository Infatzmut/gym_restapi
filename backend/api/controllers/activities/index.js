const {Router} = require('express');
const activityController = require('./activity.controller');
const activitiesController = require('./activities.controller');
const router = Router();

router.get('/', activitiesController.getAll);
router.get('/:id', activityController.get);
router.get('/:id/scheduledClases', activityController.getScheduledClases)

module.exports = router;