const {Router} = require('express');
const router = Router();
const classController = require('./class.controller');
router.get("/:classId", classController.get);
router.post("/", classController.create);

module.exports = router;