var express = require("express");
const RuleService = require("../controllers/RuleService");

var router = express.Router();

router.get("/", RuleService.get);
router.put("/", RuleService.create);
router.post("/:id", RuleService.update);
router.delete("/:id", RuleService.delete);

module.exports = router;