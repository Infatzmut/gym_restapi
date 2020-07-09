const {Router} = require('express');
const router = Router();
const classController = require('./class.controller');
router.get("/", classController.getAll);
router.post("/", classController.create);

module.exports = router;