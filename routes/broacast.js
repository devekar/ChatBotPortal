var express = require("express");
const BroadcastService = require("../controllers/BroadcastService");

var router = express.Router();

router.post("/", BroadcastService.sendMessage);

module.exports = router;