var express = require("express");
const WhatsAppController = require("../controllers/WhatsAppController");

var router = express.Router();

router.post("/", WhatsAppController.sendResponse);

module.exports = router;