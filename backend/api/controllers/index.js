const express = require('express');
const router = express.Router();
const customers = require('./customers/');

router.use('/customers', customers);

module.exports = router;