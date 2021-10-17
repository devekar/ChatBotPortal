var express = require("express");
const ContentService = require("../controllers/ContentService");

var router = express.Router();

router.get("/", ContentService.get);
router.put("/", ContentService.create);
router.post("/:id", ContentService.update);
router.delete("/:id", ContentService.delete);

module.exports = router;