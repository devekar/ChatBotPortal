var express = require("express");
const ContentService = require("../controllers/ContentService");

var router = express.Router();

router.get("/", ContentService.get);

module.exports = router;