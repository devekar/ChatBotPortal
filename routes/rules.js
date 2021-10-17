var express = require("express");
const RuleService = require("../controllers/RuleService");

var router = express.Router();

router.get("/", RuleService.get);

module.exports = router;