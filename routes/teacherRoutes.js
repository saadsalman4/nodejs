const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

router.post("/teacherLogin", teacherController.Login);
// router.post("/teacher", adminController.Register);

module.exports = router;
