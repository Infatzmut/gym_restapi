const {Router} = require('express');
const router = Router();
const trainerController = require('./trainer.controller');
const trainersController = require('./trainers.controller');
const {check} = require('express-validator')

router.get('/', trainersController.getAll);
router.get('/:id', trainerController.get);
router.post('/',[
    check('nombre', "Name has to be sent" ).not().isEmpty(),
    check('apellido_paterno', "Last name has to be sent").not().isEmpty(),
    check('tipo_doc', "Document type has to be sent").not().isEmpty(),
    check('documento','Document number has to be sent').not().isEmpty(),
    check("fecha_nacimiento", 'Birthday has to be sent').not().isEmpty(),
    check("email","Email has to be sent on email format: test@test.com").isEmail(),
    check("telefono","Phone number has to be sent").not().isEmpty(),
    check("telefono","Invalid Phone number").isNumeric(),
    check("direccion", "Direction has to be sent").not().isEmpty(),
    check("categoria", "Category has to be sent").not().isEmpty()
], trainersController.post);
router.post('/registerActivities', trainerController.registerActivities);
router.post('/:id/registerActivities', trainerController.registerActivities);
router.delete('/:id', trainerController.del);
router.get('/:id/activities', trainerController.getActivities);
router.get('/:id/scheduledActivities', trainerController.getScheduledActivities);

module.exports = router;