var express = require("express");
const MessagesService = require("../controllers/MessagesService");

var router = express.Router();

router.get("/", MessagesService.sendResponse);

module.exports = router;