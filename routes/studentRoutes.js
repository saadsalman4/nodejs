const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.post("/studentLogin", studentController.Login);

module.exports = router;
