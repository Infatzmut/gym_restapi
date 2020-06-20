const {NOT_FOUND} = require('../../util/Constants');

module.exports = (req, res, next) => res.status(NOT_FOUND).send({status: NOT_FOUND, message: "Resource not found"});