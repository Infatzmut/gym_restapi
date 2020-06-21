const express = require('express');
const router = express.Router();
const customerController = require('./customer.controller.js');
const customersController = require('./customers.controller.js');


router.get('/', customersController.getAll);
router.post('/add', customersController.add);
router.put('/:id', customerController.update);
router.delete('/:id', customerController.del);

module.exports = router;