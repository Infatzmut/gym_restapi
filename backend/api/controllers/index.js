const express = require('express');
const router = express.Router();
const customers = require('./customers/');
const personal = require('./trainers');
const activities = require('./activities')

router.use('/customers', customers);
router.use('/personal', personal);
router.use('/activities', activities);

module.exports = router;