const express = require("express");
const router = express.Router();
const globalControllers = require("./../controllers/globalControllers");

router.post("/getData", globalControllers.getData);

module.exports = router;
