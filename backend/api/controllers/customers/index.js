const express = require('express');
const router = express.Router();
const customerController = require('./customer.controller.js');
const customersController = require('./customers.controller.js');
const {check} = require('express-validator')

router.get('/', customersController.getAll);
router.get('/:id', customerController.get);
router.get("/:customerId/classes", customerController.getClassPerClient);
router.post('/add',[
    check('nombre', "Name has to be sent" ).not().isEmpty(),
    check('apellido_paterno', "Last name has to be sent").not().isEmpty(),
    check('tipo_doc', "Document type has to be sent").not().isEmpty(),
    check('documento','Document number has to be sent').not().isEmpty(),
    check("fecha_nacimiento", 'Birthday has to be sent').not().isEmpty(),
    check("email","Email has to be sent on email format: test@test.com").isEmail(),
    check("telefono","Phone number has to be sent").not().isEmpty(),
    check("telefono","Invalid Phone number").isNumeric(),
    check("direccion", "Direction has to be sent").not().isEmpty(),
    check("membresia", "Membership has to be sent").not().isEmpty()
], customersController.add);
router.put('/:id',[], customerController.update);
router.delete('/:id', customerController.del);

module.exports = router;