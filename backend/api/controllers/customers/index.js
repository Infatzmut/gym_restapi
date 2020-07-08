const express = require('express');
const router = express.Router();
const customerController = require('./customer.controller.js');
const customersController = require('./customers.controller.js');


router.get('/', customersController.getAll);
router.get('/:id', customerController.get);
router.get("/:customerId/classes", customerController.getClassPerClient);
router.post('/add', customersController.add);
router.put('/:id', customerController.update);
router.delete('/:id', customerController.del);

module.exports = router;