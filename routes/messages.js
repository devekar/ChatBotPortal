var express = require("express");
const MessageService = require("../controllers/MessageService");

var router = express.Router();

router.get("/", MessageService.get);

module.exports = router;