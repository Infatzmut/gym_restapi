const express = require('express');
const router = express.Router();
const customers = require('./customers/');
const personal = require('./trainers');
const activities = require('./activities')
const classes = require('./clases');


router.use('/customers', customers);
router.use('/personal', personal);
router.use('/activities', activities);
router.use('/classes', classes);

module.exports = router;