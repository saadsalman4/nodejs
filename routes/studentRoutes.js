const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const studentAuth = require("../middlewares/studentAuth");

router.post("/studentLogin", studentController.Login);
router.get("/student/panel", studentAuth.studentAuth, studentController.panel);
router.get(
  "/student/profile",
  studentAuth.extractUser,
  studentController.profile
);

module.exports = router;
