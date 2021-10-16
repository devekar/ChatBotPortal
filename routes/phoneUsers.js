var express = require("express");
const PhoneUserService = require("../controllers/PhoneUserService");

var router = express.Router();

router.get("/", PhoneUserService.sendResponse);

module.exports = router;